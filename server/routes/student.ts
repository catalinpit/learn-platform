import { zValidator } from "@hono/zod-validator";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { loggedIn } from "@/middleware/auth";
import {
  ZCompleteLessonSchema,
  ZGetAllStudentCoursesSchema,
  ZGetStudentCourseSchema,
  ZProgressSchema,
} from "@/shared/types";

const router = createRouter()
  .get(
    "/student/courses",
    loggedIn,
    zValidator("query", ZGetAllStudentCoursesSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid parameters", 400);
      }
    }),
    async (c) => {
      const { query, page, perPage } = c.req.valid("query");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Something went wrong", 500);
      }

      try {
        const [courses, count] = await Promise.all([
          db.course.findMany({
            where: {
              title: {
                contains: query,
                mode: "insensitive",
              },
              students: {
                some: {
                  id: user.id,
                },
              },
            },
            include: {
              chapters: {
                select: {
                  id: true,
                  lessons: {
                    select: {
                      id: true,
                      progress: {
                        where: {
                          userId: user.id,
                        },
                        select: {
                          completed: true,
                        },
                      },
                    },
                  },
                },
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
              students: {
                some: {
                  id: user.id,
                },
              },
            },
          }),
        ]);

        return c.json({
          courses,
          totalPages: Math.ceil(count / Number(perPage)),
          total: count,
        });
      } catch (error) {
        console.error("Failed to get courses:", error);
        return c.json("Failed to get courses", 500);
      }
    }
  )
  .get(
    "/student/courses/:id",
    loggedIn,
    zValidator("param", ZGetStudentCourseSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid parameters", 400);
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Something went wrong", 500);
      }

      try {
        const course = await db.course.findUnique({
          where: {
            id,
            students: {
              some: {
                id: user.id,
              },
            },
          },
          include: {
            chapters: {
              include: {
                lessons: {
                  include: {
                    progress: {
                      where: {
                        userId: user.id,
                      },
                      select: {
                        completed: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        return c.json(course);
      } catch (error) {
        console.error("Failed to get course:", error);
        return c.json("Failed to get course", 500);
      }
    }
  )
  .post(
    "/student/courses/:id/complete-lesson",
    loggedIn,
    zValidator("param", ZGetStudentCourseSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid parameters", 400);
      }
    }),
    zValidator("json", ZCompleteLessonSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid body", 400);
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      const { lessonId } = c.req.valid("json");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Something went wrong", 500);
      }

      try {
        await db.progress.upsert({
          where: {
            userId_lessonId: {
              userId: user.id,
              lessonId,
            },
          },
          update: {
            completed: true,
          },
          create: {
            userId: user.id,
            lessonId,
            courseId: id,
            completed: true,
          },
        });

        const course = await db.course.findUnique({
          where: {
            id,
            students: {
              some: {
                id: user.id,
              },
            },
          },
          include: {
            chapters: {
              include: {
                lessons: {
                  include: {
                    progress: {
                      where: {
                        userId: user.id,
                      },
                      select: {
                        completed: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        return c.json(course);
      } catch (error) {
        console.error("Failed to get course:", error);
        return c.json("Failed to get course", 500);
      }
    }
  );

export default router;
