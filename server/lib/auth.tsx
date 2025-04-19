/** @jsxImportSource react */

import { polar } from "@polar-sh/better-auth";
import { Role } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

import prisma from "@/db/index";
import env from "@/env";
import { client as mailClient } from "@/lib/mail-client";
import { client as polarClient } from "@/lib/polar-client";

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
        products: [
          {
            productId:
              env.NODE_ENV === "production"
                ? env.POLAR_PRODUCT_ID
                : env.POLAR_SANDBOX_PRODUCT_ID || "",
            slug: "pro",
          },
        ],
        successUrl: "/success?checkout_id={CHECKOUT_ID}",
      },
      webhooks: {
        secret:
          env.NODE_ENV === "production"
            ? env.POLAR_WEBHOOK_SECRET
            : (env.POLAR_SANDBOX_WEBHOOK_SECRET ?? ""),
        onPayload: async (payload: unknown) => {
          console.log("\nCatch-all webhook event:", payload, "\n");
        },
        onCheckoutCreated: async (payload: unknown) => {
          console.log("\nCheckout created:", payload, "\n");
        },
        onCheckoutUpdated: async (payload: unknown) => {
          console.log("\nCheckout updated:", payload, "\n");

          try {
            const data = (payload as any).data;

            if (!data?.customerExternalId) {
              throw new Error("No customer ID found in payload");
            }

            const user = await prisma.user.findUnique({
              where: { id: data.customerExternalId },
            });

            if (!user) {
              throw new Error("No user found");
            }

            if (data.status === "confirmed") {
              await prisma.user.update({
                where: { id: user.id },
                data: {
                  enrolledCourses: {
                    connect: {
                      id: "bc8606a7-fe8d-4cee-8b60-bfdd55eeb13e",
                    },
                  },
                },
              });
              console.log(
                "\nSuccessfully assigned the course to the user:",
                user.id,
                "\n"
              );
            }
          } catch (error) {
            throw new Error("Error processing checkout update");
          }
        },
        onOrderCreated: async (payload: unknown) => {
          console.log("\nOrder created:", payload, "\n");
        },
        onOrderRefunded: async (payload: unknown) => {
          console.log("\nOrder refunded:", payload, "\n");
        },
        onRefundCreated: async (payload: unknown) => {
          console.log("\nRefund created:", payload, "\n");
        },
        onRefundUpdated: async (payload: unknown) => {
          console.log("\nRefund updated:", payload, "\n");
        },
        onSubscriptionCreated: async (payload: unknown) => {
          console.log("\nSubscription created:", payload, "\n");
        },
        onSubscriptionUpdated: async (payload: unknown) => {
          console.log("\nSubscription updated:", payload, "\n");
        },
        onSubscriptionActive: async (payload: unknown) => {
          console.log("\nSubscription active:", payload, "\n");
        },
        onSubscriptionCanceled: async (payload: unknown) => {
          console.log("\nSubscription canceled:", payload, "\n");
        },
        onSubscriptionRevoked: async (payload: unknown) => {
          console.log("\nSubscription revoked:", payload, "\n");
        },
        onSubscriptionUncanceled: async (payload: unknown) => {
          console.log("\nSubscription uncanceled:", payload, "\n");
        },
        onProductCreated: async (payload: unknown) => {
          console.log("\nProduct created:", payload, "\n");
        },
        onProductUpdated: async (payload: unknown) => {
          console.log("\nProduct updated:", payload, "\n");
        },
        onOrganizationUpdated: async (payload: unknown) => {
          console.log("\nOrganization updated:", payload, "\n");
        },
        onBenefitCreated: async (payload: unknown) => {
          console.log("\nBenefit created:", payload, "\n");
        },
        onBenefitUpdated: async (payload: unknown) => {
          console.log("\nBenefit updated:", payload, "\n");
        },
        onBenefitGrantCreated: async (payload: unknown) => {
          console.log("\nBenefit grant created:", payload, "\n");
        },
        onBenefitGrantUpdated: async (payload: unknown) => {
          console.log("\nBenefit grant updated:", payload, "\n");
        },
        onBenefitGrantRevoked: async (payload: unknown) => {
          console.log("\nBenefit grant revoked:", payload, "\n");
        },
        onCustomerCreated: async (payload: unknown) => {
          console.log("\nCustomer created:", payload, "\n");
        },
        onCustomerUpdated: async (payload: unknown) => {
          console.log("\nCustomer updated:", payload, "\n");
        },
        onCustomerDeleted: async (payload: unknown) => {
          console.log("\nCustomer deleted:", payload, "\n");
        },
        onCustomerStateChanged: async (payload: unknown) => {
          console.log("\nCustomer state changed:", payload, "\n");
        },
      },
    }),
  ],
});
