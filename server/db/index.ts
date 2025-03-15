import { PrismaClient } from "@prisma/client";

import env from "@/env";

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient;
}

// In production, we want to use the environment variable directly
// This ensures we use the Kubernetes-provided DATABASE_URL
// eslint-disable-next-line node/no-process-env
const isProduction = process.env.NODE_ENV === "production";

// We need to access DATABASE_URL safely
// eslint-disable-next-line node/no-process-env
const processEnv = process.env as Record<string, string | undefined>;
// eslint-disable-next-line dot-notation
const directDatabaseUrl = isProduction ? processEnv["DATABASE_URL"] : undefined;
const databaseUrl = directDatabaseUrl || env.DATABASE_URL;

// Initialize Prisma client with the appropriate database URL
const prisma = globalThis.prisma || 
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

// eslint-disable-next-line node/no-process-env
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Log the database connection details (with password masked) for debugging
// eslint-disable-next-line node/no-process-env
if (process.env.NODE_ENV === "production") {
  const maskedUrl = databaseUrl 
    ? databaseUrl.replace(/:([^:@]+)@/, ":****@") 
    : "DATABASE_URL is undefined";
  console.warn(`Database connection URL: ${maskedUrl}`);
}

export default prisma;
