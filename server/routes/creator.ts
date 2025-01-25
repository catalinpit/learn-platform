import { zValidator } from "@hono/zod-validator";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { loggedIn } from "@/middleware/auth";
import {
  ZCreateChapterSchema,
  ZCreateCourseSchema,
  ZGetCourseByIdSchema,
} from "@/shared/types";

const router = createRouter()
  .post(
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
      }

      try {
        const course = await db.course.create({
          data: {
            ...courseData,
            isPublished: false,
            ownerId: courseCreator.id,
          },
        });

        return c.json(course);
      } catch (error) {
        console.error("Failed to create course:", error);
        return c.json("Failed to create course", 500);
      }
    }
  )
  .post(
    "/creator/courses/:id/chapters",
    loggedIn,
    zValidator("param", ZGetCourseByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    zValidator("json", ZCreateChapterSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid body", 400);
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      const chapterData = c.req.valid("json");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Something went wrong", 404);
      }

      try {
        const course = await db.course.findFirst({
          where: {
            id,
            ownerId: user.id,
          },
        });

        if (!course) {
          return c.json("Course not found", 404);
        }

        const chapter = await db.chapter.create({
          data: {
            ...chapterData,
            courseId: course.id,
          },
        });

        return c.json(chapter);
      } catch (error) {
        console.error("Failed to create chapter:", error);
        return c.json("Failed to create chapter", 500);
      }
    }
  );

export default router;
