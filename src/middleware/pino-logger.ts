import { pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

export function customLogger() {
  return pinoLogger({
    pino: pino(process.env.NODE_ENV === "production" ? undefined : pretty()),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
