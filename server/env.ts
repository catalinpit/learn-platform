import type { ZodError } from "zod";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

export const EnvSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]).default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(32).max(32),
  BETTER_AUTH_URL: z.string().url(),
  POLAR_ACCESS_TOKEN: z.string(),
  POLAR_SANDBOX_ACCESS_TOKEN: z.string().optional(),
  POLAR_PRODUCT_ID: z.string(),
  POLAR_SANDBOX_PRODUCT_ID: z.string().optional(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  RESEND_KEY: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line import/no-mutable-exports
let env: Env;

try {
  // eslint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env);
} catch (err) {
  const error = err as ZodError;
  console.error("Invalid env:");
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;
