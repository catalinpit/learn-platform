import { Polar } from "@polar-sh/sdk";

import env from "@/env";

export const client = new Polar({
  accessToken:
    env.NODE_ENV === "production"
      ? env.POLAR_ACCESS_TOKEN
      : env.POLAR_SANDBOX_ACCESS_TOKEN,
  server: env.NODE_ENV === "production" ? "production" : "sandbox",
});
