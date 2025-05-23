import type { PinoLogger } from "hono-pino";

import { z } from "zod";

import type { AppType } from "../app";
import type { auth } from "../lib/auth";

import { CourseTagSchema } from "../prisma/generated/types";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export interface AuthType {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}

export { type AppType };

////////////////////////////
// Courses Router Schemas //
////////////////////////////
export const ZGetAllCoursesSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
  perPage: z.coerce.number().min(1).optional().default(4),
});

export type TGetAllCoursesType = z.infer<typeof ZGetAllCoursesSchema>;

export const ZGetCourseByIdSchema = z.object({
  id: z.string(),
});

export const ZGetChapterByIdSchema = ZGetCourseByIdSchema.extend({
  chapterId: z.string(),
});

export const ZGetLessonByIdSchema = ZGetChapterByIdSchema.extend({
  lessonId: z.string(),
});

export type TGetCourseByIdType = z.infer<typeof ZGetCourseByIdSchema>;
export type TGetChapterByIdType = z.infer<typeof ZGetChapterByIdSchema>;
export type TGetLessonByIdType = z.infer<typeof ZGetLessonByIdSchema>;

////////////////////////////
// Creator Router Schemas //
////////////////////////////

export const ZGetAllCreatorCoursesSchema = ZGetAllCoursesSchema;

export const ZCreateCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(CourseTagSchema),
  coverImage: z.string().url("Invalid image URL").optional(),
  price: z.number().min(0, "Price must be non-negative"),
  isPublished: z.boolean().default(false),
});

export const ZUpdateCourseSchema = ZCreateCourseSchema;

export const ZCreateChapterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  isPublished: z.boolean().default(false),
  isFree: z.boolean().default(false),
});

export const ZUpdateChapterSchema = ZCreateChapterSchema;

export const ZCreateLessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  isPublished: z.boolean().default(false),
  isFree: z.boolean().default(false),
});

export const ZUpdateLessonSchema = ZCreateLessonSchema;

export type TGetAllCreatorCoursesType = z.infer<
  typeof ZGetAllCreatorCoursesSchema
>;
export type TCreateCourseType = z.infer<typeof ZCreateCourseSchema>;
export type TUpdateCourseType = z.infer<typeof ZUpdateCourseSchema>;
export type TCreateChapterType = z.infer<typeof ZCreateChapterSchema>;
export type TUpdateChapterType = z.infer<typeof ZUpdateChapterSchema>;
export type TCreateLessonType = z.infer<typeof ZCreateLessonSchema>;
export type TUpdateLessonType = z.infer<typeof ZUpdateLessonSchema>;

////////////////////////////
// Student Router Schemas //
////////////////////////////

export const ZGetAllStudentCoursesSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
  perPage: z.coerce.number().min(1).optional().default(4),
});

export const ZGetStudentCourseSchema = z.object({
  id: z.string(),
});

export const ZCompleteLessonSchema = z.object({
  lessonId: z.string(),
});

export type TGetAllStudentCoursesType = z.infer<
  typeof ZGetAllStudentCoursesSchema
>;
export type TGetStudentCourseType = z.infer<typeof ZGetStudentCourseSchema>;
export type TCompleteLessonType = z.infer<typeof ZCompleteLessonSchema>;

////////////////////////////
// Payments Router Schemas //
////////////////////////////

export const ZCreateCheckoutSchema = z.object({
  productId: z.string(),
});

export type TCreateCheckoutType = z.infer<typeof ZCreateCheckoutSchema>;

export const ZGetCheckoutSchema = z.object({
  checkoutId: z.string(),
});

export type TGetCheckoutType = z.infer<typeof ZGetCheckoutSchema>;
