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
  trustedOrigins: [
    "http://localhost:5173",
    "https://sf.catalins.tech",
    "https://vast-python-reliably.ngrok-free.app",
  ],
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
            const data = payload.data;

            if (!data?.customerExternalId) {
              throw new Error("No customer ID found in payload");
            }

            const user = await prisma.user.findUnique({
              where: { id: data.customerExternalId },
            });

            if (!user) {
              throw new Error("No user found");
            }

            if (data.status === "succeeded") {
              const course = await prisma.course.findFirst({
                where: { productId: data.product.id },
              });

              if (!course) {
                throw new Error(`Course with product ID ${data.product.id} not found`);
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
            }
          }
          catch (error) {
            console.error("Error processing checkout update feghedem", error);
            throw new Error("Error processing checkout update");
          }
        },
      },
    }),
  ],
});
