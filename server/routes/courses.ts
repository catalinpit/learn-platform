import { zValidator } from "@hono/zod-validator";

import type { Course } from "@/prisma/generated/types";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { ZGetAllCoursesSchema, ZGetCourseByIdSchema } from "@/shared/types";
import { stripHTMLTags } from "@/utils/utilities";

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
        courses: courses.map((course: Course) => ({
          ...course,
          description: stripHTMLTags(course.description),
        })),
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
        select: {
          id: true,
          title: true,
          description: true,
          isPublished: true,
          price: true,
          coverImage: true,
          tags: true,
          productId: true,
          ownerId: true,
          chapters: {
            select: {
              id: true,
              title: true,
              description: true,
              isPublished: true,
              isFree: true,
              lessons: {
                select: {
                  id: true,
                  title: true,
                  content: true,
                  position: true,
                  isPublished: true,
                  isFree: true,
                  createdAt: true,
                  updatedAt: true,
                  chapterId: true,
                },
              },
            },
          },
        },
      });

      if (!course) {
        return c.json({ message: "Course not found" });
      }

      const processedCourse = {
        ...course,
        chapters: course.chapters.map((chapter) => ({
          ...chapter,
          lessons: chapter.lessons.map((lesson) => ({
            ...lesson,
            content: lesson.isFree ? lesson.content : undefined,
          })),
        })),
      };

      return c.json(processedCourse);
    },
  );

export default router;
