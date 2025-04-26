import env from "@/env";

import { PrismaClient } from "../prisma/generated/client";

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient;
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
    enableTracing: true,
  });

if (env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
