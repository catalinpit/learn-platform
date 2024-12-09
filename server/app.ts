import createApp from "@/lib/create-app";
import auth from "@/routes/auth";
import courses from "@/routes/courses";
import index from "@/routes/index";

const app = createApp();

const routes = [index, courses, auth];

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
