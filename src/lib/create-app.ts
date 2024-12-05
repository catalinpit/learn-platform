import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings } from "@/lib/types";

import notFound from "@/middleware/not-found";
import onError from "@/middleware/on-error";
import { customLogger } from "@/middleware/pino-logger";

export default function createApp() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
  });
  app.use(customLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
