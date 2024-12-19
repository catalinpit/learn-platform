import createApp from "@/lib/create-app";
import auth from "@/routes/auth";
import courses from "@/routes/courses";
import index from "@/routes/index";
import { serveStatic } from "hono/bun";

const app = createApp();

const routes = [index, courses, auth];

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export type AppType = (typeof routes)[number];

export default app;
