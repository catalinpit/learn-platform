import { zValidator } from "@hono/zod-validator";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { ZGetAllCoursesSchema, ZGetCourseByIdSchema } from "@/shared/types";

const router = createRouter()
  .get(
    "/courses",
    zValidator("query", ZGetAllCoursesSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid parameters", 400);
      }
    }),
    async (c) => {
      const { query, page, perPage } = c.req.valid("query");

      const [courses, count] = await Promise.all([
        db.course.findMany({
          where: {
            title: {
              contains: query,
              mode: "insensitive",
            },
            isPublished: true,
          },
          skip: (Number(page) - 1) * Number(perPage),
          take: Number(perPage),
        }),
        db.course.count({
          where: {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        }),
      ]);

      return c.json({
        courses,
        totalPages: Math.ceil(count / perPage),
      });
    },
  )
  .get(
    "/courses/:id",
    zValidator("param", ZGetCourseByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");

      const course = await db.course.findUnique({
        where: {
          id: String(id),
        },
        include: {
          chapters: {
            include: {
              lessons: true,
            },
          },
        },
      });

      if (!course) {
        return c.json({ message: "Course not found" });
      }

      return c.json(course);
    },
  );

export default router;
