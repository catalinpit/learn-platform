import { zValidator } from "@hono/zod-validator";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { client as polarClient } from "@/lib/polar-client";
import { loggedIn } from "@/middleware/auth";
import {
  ZCreateChapterSchema,
  ZCreateCourseSchema,
  ZCreateLessonSchema,
  ZGetAllCreatorCoursesSchema,
  ZGetChapterByIdSchema,
  ZGetCourseByIdSchema,
  ZGetLessonByIdSchema,
  ZUpdateChapterSchema,
  ZUpdateCourseSchema,
  ZUpdateLessonSchema,
} from "@/shared/types";
import { stripHTMLTags, toUSD } from "@/utils/utilities";

const router = createRouter()
  .get(
    "/creator/courses",
    loggedIn,
    zValidator("query", ZGetAllCreatorCoursesSchema, (result, c) => {
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
              ownerId: user.id,
            },
            skip: (Number(page) - 1) * Number(perPage),
            take: Number(perPage),
            orderBy: {
              createdAt: "desc",
            },
          }),
          db.course.count({
            where: {
              title: {
                contains: query,
                mode: "insensitive",
              },
              ownerId: user.id,
            },
          }),
        ]);

        return c.json({
          courses,
          totalPages: Math.ceil(count / Number(perPage)),
          total: count,
        });
      } catch (error) {
        return c.json("Failed to get courses", 500);
      }
    },
  )
  .get(
    "/creator/courses/:id",
    loggedIn,
    zValidator("param", ZGetCourseByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      const courseCreator = c.get("Variables").user;

      if (!courseCreator) {
        return c.json("Something went wrong", 500);
      }

      try {
        const course = await db.course.findUnique({
          where: {
            id,
            ownerId: courseCreator.id,
          },
          include: {
            chapters: {
              include: {
                lessons: true,
              },
            },
          },
        });

        return c.json(course);
      } catch (error) {
        return c.json("Failed to get course", 500);
      }
    },
  )
  .patch(
    "/creator/courses/:id",
    loggedIn,
    zValidator("param", ZGetCourseByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    zValidator("json", ZUpdateCourseSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid data", 400);
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      const courseData = c.req.valid("json");
      const courseCreator = c.get("Variables").user;

      if (!courseCreator) {
        return c.json("Something went wrong", 500);
      }

      const course = await db.course.findFirst({
        where: {
          id,
          ownerId: courseCreator.id,
        },
      });

      if (!course) {
        return c.json("Course not found", 404);
      }

      if (course.isPublished !== courseData.isPublished) {
        return c.json({ error: "Cannot update this field" }, 400);
      }

      let updatedCourse;

      try {
        updatedCourse = await db.course.update({
          where: {
            id,
            ownerId: courseCreator.id,
          },
          data: courseData,
        });

        if (course.productId) {
          await polarClient.products.update({
            id: course.productId,
            productUpdate: {
              name: courseData.title,
              description: stripHTMLTags(courseData.description),
              recurringInterval: null,
              medias: [],
              prices: [
                {
                  priceCurrency: "usd",
                  priceAmount: toUSD(courseData.price),
                  amountType: "fixed",
                },
              ],
            },
          });
        }

        return c.json(updatedCourse);
      } catch (error) {
        return c.json({ error: "Failed to update course" }, 500);
      }
    },
  )
  .delete(
    "/creator/courses/:id",
    loggedIn,
    zValidator("param", ZGetCourseByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      const courseCreator = c.get("Variables").user;

      if (!courseCreator) {
        return c.json("Something went wrong", 500);
      }

      const course = await db.course.findFirst({
        where: {
          id,
          ownerId: courseCreator.id,
        },
      });

      if (!course) {
        return c.json({ message: "Course not found" });
      }

      try {
        const deletedCourse = await db.course.delete({
          where: {
            id,
            ownerId: courseCreator.id,
          },
        });

        if (course.productId) {
          await polarClient.products.update({
            id: course.productId,
            productUpdate: {
              isArchived: true,
            },
          });
        }

        return c.json(deletedCourse);
      } catch (error) {
        return c.json({ error: "Failed to delete course" }, 500);
      }
    },
  )
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
        return c.json("Failed to create course", 500);
      }
    },
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
        return c.json("Failed to create chapter", 500);
      }
    },
  )
  .patch(
    "/creator/courses/:id/chapters/:chapterId",
    loggedIn,
    zValidator("param", ZGetChapterByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    zValidator("json", ZUpdateChapterSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid body", 400);
      }
    }),
    async (c) => {
      const { id, chapterId } = c.req.valid("param");
      const updatedChapterData = c.req.valid("json");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Something went wrong", 404);
      }

      try {
        const updatedChapter = await db.chapter.update({
          where: {
            id: chapterId,
            courseId: id,
            course: {
              ownerId: user.id,
            },
          },
          data: updatedChapterData,
        });

        return c.json(updatedChapter);
      } catch (error) {
        return c.json("Failed to update chapter", 500);
      }
    },
  )
  .delete(
    "/creator/courses/:id/chapters/:chapterId",
    loggedIn,
    zValidator("param", ZGetChapterByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    async (c) => {
      const { id, chapterId } = c.req.valid("param");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Something went wrong", 404);
      }

      try {
        const deletedChapter = await db.chapter.delete({
          where: {
            id: chapterId,
            courseId: id,
            course: {
              ownerId: user.id,
            },
          },
        });

        return c.json(deletedChapter);
      } catch (error) {
        return c.json("Failed to delete chapter", 500);
      }
    },
  )
  .post(
    "/creator/courses/:id/chapters/:chapterId/lessons",
    loggedIn,
    zValidator("param", ZGetChapterByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    zValidator("json", ZCreateLessonSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid body", 400);
      }
    }),
    async (c) => {
      const { id, chapterId } = c.req.valid("param");
      const lessonData = c.req.valid("json");
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

        const chapter = await db.chapter.findFirst({
          where: {
            id: chapterId,
            courseId: course.id,
          },
        });

        if (!chapter) {
          return c.json("Chapter not found", 404);
        }

        const lastLesson = await db.lesson.findFirst({
          where: { chapterId: chapter.id },
          orderBy: { position: "desc" },
        });

        const position = lastLesson ? lastLesson.position + 1 : 1;

        const lesson = await db.lesson.create({
          data: {
            ...lessonData,
            chapterId: chapter.id,
            position,
          },
        });

        return c.json(lesson);
      } catch (error) {
        return c.json("Failed to create lesson", 500);
      }
    },
  )
  .patch(
    "/creator/courses/:id/chapters/:chapterId/lessons/:lessonId",
    loggedIn,
    zValidator("param", ZGetLessonByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    zValidator("json", ZUpdateLessonSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid body", 400);
      }
    }),
    async (c) => {
      const { id, chapterId, lessonId } = c.req.valid("param");
      const updatedLessonData = c.req.valid("json");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Unauthorized", 401);
      }

      const lesson = await db.lesson.findUnique({
        where: {
          id: lessonId,
          chapterId,
          chapter: {
            courseId: id,
            course: {
              ownerId: user.id,
            },
          },
        },
      });

      if (!lesson) {
        return c.json("Lesson not found", 404);
      }

      try {
        const updatedLesson = await db.lesson.update({
          where: {
            id: lessonId,
            chapterId,
            chapter: {
              courseId: id,
              course: {
                ownerId: user.id,
              },
            },
          },
          data: updatedLessonData,
        });

        return c.json(updatedLesson);
      } catch (error) {
        return c.json("Failed to update lesson", 500);
      }
    },
  )
  .delete(
    "/creator/courses/:id/chapters/:chapterId/lessons/:lessonId",
    loggedIn,
    zValidator("param", ZGetLessonByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    async (c) => {
      const { id, chapterId, lessonId } = c.req.valid("param");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Something went wrong", 404);
      }

      try {
        const lesson = await db.lesson.delete({
          where: {
            id: lessonId,
            chapterId,
            chapter: {
              courseId: id,
              course: {
                ownerId: user.id,
              },
            },
          },
        });

        return c.json(lesson);
      } catch (error) {
        return c.json("Failed to delete lesson", 500);
      }
    },
  )
  .post(
    "/creator/courses/:id/publish",
    loggedIn,
    zValidator("param", ZGetCourseByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Something went wrong", 404);
      }

      try {
        const course = await db.course.findFirstOrThrow({
          where: {
            id,
            ownerId: user.id,
          },
        });

        let polarProduct;

        if (!course.productId) {
          polarProduct = await polarClient.products.create({
            name: course.title,
            description: stripHTMLTags(course.description),
            recurringInterval: null,
            prices: [
              {
                priceCurrency: "usd",
                priceAmount: toUSD(course.price),
                amountType: "fixed",
              },
            ],
            medias: [],
            metadata: {
              courseId: course.id,
              creatorId: user.id,
            },
          });
        } else {
          await polarClient.products.update({
            id: course.productId,
            productUpdate: {
              isArchived: false,
            },
          });
        }

        await db.course.update({
          where: { id: course.id },
          data: {
            productId: course.productId || polarProduct?.id,
            isPublished: true,
          },
        });

        return c.json(course);
      } catch (error) {
        return c.json({ error: "Failed to publish course" }, 500);
      }
    },
  )
  .post(
    "/creator/courses/:id/unpublish",
    loggedIn,
    zValidator("param", ZGetCourseByIdSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid ID", 400);
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Something went wrong", 404);
      }

      try {
        const course = await db.course.update({
          where: {
            id,
            ownerId: user.id,
          },
          data: {
            isPublished: false,
          },
        });

        if (course.productId) {
          await polarClient.products.update({
            id: course.productId,
            productUpdate: {
              isArchived: true,
            },
          });
        }
        return c.json(course);
      } catch (error) {
        return c.json("Failed to unpublish course", 500);
      }
    },
  );

export default router;
