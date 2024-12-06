import createApp from "@/lib/create-app";
import courses from "@/routes/courses/courses.index";
import index from "@/routes/index.route";

const app = createApp();

const routes = [
  index,
  courses,
];

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
