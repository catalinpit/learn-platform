import createApp from "@/lib/create-app";
import auth from "@/routes/auth";
import courses from "@/routes/courses";
import creator from "@/routes/creator";
import payments from "@/routes/payments";
import student from "@/routes/student";
import userSettings from "@/routes/user-settings";

const app = createApp();

const routes = [
  userSettings,
  creator,
  student,
  courses,
  auth,
  payments,
] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
