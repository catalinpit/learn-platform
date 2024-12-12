// import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { cors } from "hono/cors";

import type { AppBindings, AuthType } from "~/shared/types";

import { authMiddleware, corsMiddleware } from "@/middleware/auth";
import notFound from "@/middleware/not-found";
import onError from "@/middleware/on-error";
import { customLogger } from "@/middleware/pino-logger";

export function createRouter() {
  return new Hono<{ Bindings: AppBindings; Variables: AuthType }>({
    strict: false,
  });
}

export default function createApp() {
  const app = createRouter();

  app.use(customLogger());
  app.use("*", authMiddleware);
  app.use("/api/auth/**", corsMiddleware);

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
