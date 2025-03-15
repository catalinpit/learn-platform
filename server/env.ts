import type { ZodError } from "zod";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

// Only load .env file in development
// eslint-disable-next-line node/no-process-env
if (process.env.NODE_ENV !== "production") {
  expand(config());
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
  
  // In production, log environment variable names (not values) for debugging
  // eslint-disable-next-line node/no-process-env
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line node/no-process-env
    const envVarNames = Object.keys(process.env).filter(key => {
      // eslint-disable-next-line node/no-process-env
      return Boolean(process.env[key]);
    }).join(", ");
    console.warn("Available environment variables in production:", envVarNames);
  }
} catch (err) {
  const error = err as ZodError;
  console.error("Invalid env:");
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;
