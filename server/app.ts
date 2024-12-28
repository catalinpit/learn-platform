import { serveStatic } from "hono/bun";

import createApp from "@/lib/create-app";
import auth from "@/routes/auth";
import courses from "@/routes/courses";
import creator from "@/routes/creator";
import student from "@/routes/student";
import userSettings from "@/routes/user-settings";

const app = createApp();

const routes = [userSettings, creator, student, courses, auth] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export type AppType = (typeof routes)[number];

export default app;
