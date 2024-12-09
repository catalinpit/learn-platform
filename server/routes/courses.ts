import db from "@/db";
import { createRouter } from "@/lib/create-app";

const router = createRouter().get("/courses", async (c) => {
  const courses = await db.course.findMany();
  const loggedInUser = c.get("Variables").user;

  if (!loggedInUser) {
    return c.json({ message: "You must be logged in to view courses" }, 401);
  }

  return c.json(courses);
});

export default router;
