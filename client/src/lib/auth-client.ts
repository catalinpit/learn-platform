import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { Role } from "@server/shared/types";

export const authClient = createAuthClient({
  baseURL: "http://localhost:5173",
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

export const { useSession, signIn, signOut } = authClient;

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
