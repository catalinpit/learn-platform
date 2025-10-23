import app from "./app";
import env from "./env";

const port = env.PORT;

// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port}`);

Bun.serve({
  fetch: app.fetch,
  hostname: "0.0.0.0",
  port: env.PORT || 9999,
});
