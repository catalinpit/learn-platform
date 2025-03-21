/** @jsxImportSource react */

import { polar } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { Role } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

import prisma from "@/db/index";
import env from "@/env";
import { client as mailClient } from "@/lib/mail-client";

import { EmailTemplate } from "../react-email-starter/emails/email-template";

const client = new Polar({
  accessToken:
    env.NODE_ENV === "production"
      ? env.POLAR_ACCESS_TOKEN
      : env.POLAR_SANDBOX_ACCESS_TOKEN,
  server: env.NODE_ENV === "production" ? "production" : "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // couldn't make requests from the frontend to the backend without this trustedOrigins property
  trustedOrigins: ["http://localhost:5173", "https://sf.catalins.tech"],
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
      client,
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
    }),
  ],
});
