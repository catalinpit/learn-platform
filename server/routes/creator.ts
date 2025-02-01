import { zValidator } from "@hono/zod-validator";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { loggedIn } from "@/middleware/auth";
import {
  ZCreateChapterSchema,
  ZCreateCourseSchema,
  ZCreateLessonSchema,
  ZGetChapterByIdSchema,
  ZGetCourseByIdSchema,
  ZGetLessonByIdSchema,
  ZUpdateChapterSchema,
  ZUpdateLessonSchema,
} from "@/shared/types";

const router = createRouter()
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
            id: String(id),
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
        console.error("Failed to get course:", error);
        return c.json("Failed to get course", 500);
      }
    }
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

      const course = await db.course.findUnique({
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

        return c.json(deletedCourse);
      } catch (error) {
        console.error("Failed to delete course:", error);
        return c.json("Failed to delete course", 500);
      }
    }
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
        console.error("Failed to update chapter:", error);
        return c.json("Failed to update chapter", 500);
      }
    }
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
        console.error("Failed to delete chapter:", error);
        return c.json("Failed to delete chapter", 500);
      }
    }
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
        console.error("Failed to create lesson:", error);
        return c.json("Failed to create lesson", 500);
      }
    }
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
        console.error("Failed to update lesson:", error);
        return c.json("Failed to update lesson", 500);
      }
    }
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
        console.error("Failed to delete lesson:", error);
        return c.json("Failed to delete lesson", 500);
      }
    }
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
        const course = await db.course.update({
          where: {
            id,
            ownerId: user.id,
          },
          data: {
            isPublished: true,
          },
        });

        return c.json(course);
      } catch (error) {
        console.error("Failed to publish course:", error);
        return c.json("Failed to publish course", 500);
      }
    }
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

        return c.json(course);
      } catch (error) {
        console.error("Failed to unpublish course:", error);
        return c.json("Failed to unpublish course", 500);
      }
    }
  );

export default router;
