import { zValidator } from "@hono/zod-validator";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { loggedIn } from "@/middleware/auth";
import { ZCreateCourseSchema } from "@/shared/types";

const router = createRouter().post(
  "/creator/courses",
  loggedIn,
  zValidator("json", ZCreateCourseSchema, (result, c) => {
    if (!result.success) {
      return c.json("Invalid body", 400);
    }
  }),
  async (c) => {
    const courseData = c.req.valid("json");
    const courseCreator = c.get("Variables").user;

    if (!courseCreator) {
      return c.json("Something went wrong", 404);
    } else {
      const course = await db.course.create({
        data: {
          ...courseData,
          ownerId: courseCreator.id,
        },
      });

      return c.json(course);
    }
  }
);

export default router;
