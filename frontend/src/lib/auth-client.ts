import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:5173",
});

export const { useSession, signIn, signOut } = authClient;

export type Session = typeof authClient.$Infer.Session;
