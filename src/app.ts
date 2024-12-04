import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";

import notFound from "./middleware/not-found";
import onError from "./middleware/on-error";
import { customLogger } from "./middleware/pino-logger";

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

const app = new OpenAPIHono<AppBindings>();
app.use(customLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.notFound(notFound);
app.onError(onError);

export default app;
