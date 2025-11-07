import env from "@/env";

import { PrismaClient } from "../prisma/generated/client/client";

declare global {
  // eslint-disable-next-line vars-on-top
  var prisma: PrismaClient;
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
