import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import env from "@server/env";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        roles: {
          type: "string[]",
        },
      },
    }),
  ],
});

export const {
  useSession,
  getSession,
  signIn,
  signUp,
  signOut,
  forgetPassword,
  resetPassword,
} = authClient;

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
