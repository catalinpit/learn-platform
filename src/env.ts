import type { ZodError } from "zod";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

export const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
});

export type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
  env = EnvSchema.parse(process.env);
}
catch (err) {
  const error = err as ZodError;
  console.error("Invalid env:");
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;
