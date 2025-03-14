import type { ZodError } from "zod";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

// Only load .env file in development environment
// In production, environment variables should come from Kubernetes
if (process.env.NODE_ENV !== "production") {
  console.log("Loading environment variables from .env file (development mode)");
  expand(config());
} else {
  console.log("Using environment variables from the system (production mode)");
  // Log environment variables for debugging in production
  console.log("Available environment variables:", Object.keys(process.env).join(", "));
}

export const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(32).max(32),
  BETTER_AUTH_URL: z.string().url(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
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
