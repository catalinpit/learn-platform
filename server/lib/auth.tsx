/** @jsxImportSource react */

import { polar } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

import prisma from "@/db/index";
import env from "@/env";
import { client as mailClient } from "@/lib/mail-client";
import { client as polarClient } from "@/lib/polar-client";

import { Role } from "../prisma/generated/client";
import { EmailTemplate } from "../react-email-starter/emails/email-template";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // couldn't make requests from the frontend to the backend without this trustedOrigins property
  trustedOrigins: ["http://localhost:5173", "https://learn.self-host.tech"],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await mailClient.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        react: (
          <EmailTemplate
            username={user.name}
            previewText="Reset your password"
            header="Reset your password"
            emailText="please reset your password"
            buttonText="Reset password"
            actionLink={url}
          />
        ),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await mailClient.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Email Verification",
        react: (
          <EmailTemplate
            username={user.name}
            previewText="Verify your email"
            header="Verify your email"
            emailText="please verify your email"
            buttonText="Verify email"
            actionLink={url}
          />
        ),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      roles: {
        type: [Role.STUDENT, Role.CREATOR, Role.ADMIN],
        required: true,
        defaultValue: [Role.STUDENT],
        role: Role,
      },
    },
  },
  plugins: [
    admin(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      checkout: {
        enabled: true,
        products: [],
        successUrl: "/success?checkout_id={CHECKOUT_ID}",
      },
      webhooks: {
        secret:
          env.NODE_ENV === "production"
            ? env.POLAR_WEBHOOK_SECRET
            : (env.POLAR_SANDBOX_WEBHOOK_SECRET ?? ""),
        onCheckoutUpdated: async (payload) => {
          try {
            console.log("Processing checkout update:", JSON.stringify(payload, null, 2));

            const data = payload.data;

            // Log the structure to understand what we're receiving
            console.log("Payload type:", payload.type);
            console.log("Data object:", data);
            console.log("Data keys:", data ? Object.keys(data) : "data is null/undefined");

            // Check for different possible customer ID fields
            const customerExternalId = data?.customerExternalId || data?.customer?.externalId || data?.customer?.id;
            console.log("Customer External ID found:", customerExternalId);

            if (!customerExternalId) {
              console.error("No customer ID found in payload. Full data object:", JSON.stringify(data, null, 2));
              console.error("Possible customer fields:", {
                customerExternalId: data?.customerExternalId,
                customerExternalIdType: typeof data?.customerExternalId,
                customer: data?.customer,
                customerId: data?.customerId,
                userId: data?.userId,
                userExternalId: data?.userExternalId
              });
              throw new Error("No customer ID found in payload");
            }

            console.log("Looking for user with ID:", customerExternalId);
            const user = await prisma.user.findUnique({
              where: { id: customerExternalId },
            });

            if (!user) {
              console.error("No user found with ID:", customerExternalId);
              throw new Error(`No user found with ID: ${customerExternalId}`);
            }

            console.log("Found user:", user.email);

            if (data.status === "succeeded") {
              console.log("Checkout succeeded, looking for course with product ID:", data.product.id);

              // First, let's see all courses to debug
              const allCourses = await prisma.course.findMany({
                select: { id: true, title: true, productId: true }
              });
              console.log("All courses in database:", allCourses);

              const course = await prisma.course.findFirst({
                where: { productId: data.product.id },
              });

              if (!course) {
                console.error("Course not found with product ID:", data.product.id);
                console.error("Available courses with productIds:", allCourses.filter(c => c.productId));
                throw new Error(
                  `Course with product ID ${data.product.id} not found. Available courses: ${allCourses.map(c => `${c.title} (productId: ${c.productId})`).join(', ')}`,
                );
              }

              console.log("Found course:", course.title, "- enrolling user");

              // Check if user is already enrolled
              const existingEnrollment = await prisma.user.findFirst({
                where: {
                  id: user.id,
                  enrolledCourses: {
                    some: { id: course.id }
                  }
                }
              });

              if (existingEnrollment) {
                console.log("User is already enrolled in this course");
                return;
              }

              await prisma.user.update({
                where: { id: user.id },
                data: {
                  enrolledCourses: {
                    connect: {
                      id: course.id,
                    },
                  },
                },
              });

              console.log("Successfully enrolled user in course");
            } else {
              console.log("Checkout status is not succeeded:", data.status);
            }
          } catch (error) {
            console.error("Error processing checkout update:", error);
            console.error("Original payload:", JSON.stringify(payload, null, 2));

            // Preserve the original error message and stack trace
            if (error instanceof Error) {
              throw new Error(`Error processing checkout update: ${error.message}`);
            } else {
              throw new Error(`Error processing checkout update: ${String(error)}`);
            }
          }
        },
      },
    }),
  ],
});
