import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession } = createAuthClient({
  baseURL: "http://localhost:9999",
});
