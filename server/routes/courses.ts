import { zValidator } from "@hono/zod-validator";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { loggedIn } from "@/middleware/auth";
import { ZGetAllCoursesSchema, ZGetCourseByIdSchema } from "@/shared/types";

const router = createRouter()
  .get(
    "/courses",
    zValidator("query", ZGetAllCoursesSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid parameters", 400);
      }
    }),
    loggedIn,
    async (c) => {
      const { query, page, perPage } = c.req.valid("query");

      const [courses, count] = await Promise.all([
        db.course.findMany({
          where: {
            title: {
              contains: query,
              mode: "insensitive",
            },
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

      console.log("\n");
      console.log("\n");
      console.log("\n");
      console.log("\n");
      console.log({ query, page, perPage });
      console.log({ courses, count });
      console.log("\n");
      console.log("\n");
      console.log("\n");
      console.log("\n");

      return c.json({
        courses,
        totalPages: Math.ceil(count / perPage),
      });
    }
  )
  .get(
    "/courses/:id",
    loggedIn,
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
      });

      if (!course) {
        return c.json({ message: "Course not found" });
      }

      return c.json(course);
    }
  );

export default router;
