import { Role } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/db/index";
import env from "@/env";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // couldn't make requests from the frontend to the backend without this trustedOrigins property
  trustedOrigins: ["http://localhost:5173", "https://sf.catalins.tech"],
  emailAndPassword: {
    enabled: true,
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
});
