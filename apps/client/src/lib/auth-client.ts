import { createAuthClient } from "better-auth/react";
import { createAuthClient as createAuthClientVanilla } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
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


export const authClientVanilla = createAuthClientVanilla({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
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

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
