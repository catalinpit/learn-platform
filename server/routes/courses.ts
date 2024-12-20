import { zValidator } from "@hono/zod-validator";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { loggedIn } from "@/middleware/auth";
import { GetCourseByIdSchema } from "@/shared/types";

const router = createRouter()
  .get("/courses", loggedIn, async (c) => {
    const courses = await db.course.findMany();

    return c.json(courses);
  })
  .get(
    "/courses/:id",
    loggedIn,
    zValidator("param", GetCourseByIdSchema),
    async (c) => {
      const { id } = c.req.valid("param");

      const course = await db.course.findUnique({
        where: {
          id: String(id),
        },
      });

      if (!course) {
        return c.json({ message: "Course not found" });
      }

      return c.json(course);
    }
  );

export default router;
