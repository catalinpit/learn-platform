import createApp from "@/lib/create-app";
import auth from "@/routes/auth.route";
import courses from "@/routes/courses/courses.index";
import index from "@/routes/index.route";

const app = createApp();

const routes = [index, courses, auth];

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
