// import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";

import type { AppBindings } from "@/lib/types";

import notFound from "@/middleware/not-found";
import onError from "@/middleware/on-error";
import { customLogger } from "@/middleware/pino-logger";

export function createRouter() {
  return new Hono<AppBindings>({
    strict: false,
  });
}

export default function createApp() {
  const app = createRouter();

  app.use(customLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
