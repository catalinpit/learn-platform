import type { User } from "@prisma/client";
import type { PinoLogger } from "hono-pino";

import { Role } from "@prisma/client";
import { z } from "zod";

import type { AppType } from "../app";
import type { auth } from "../lib/auth";

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

export { type AppType, Role, type User };

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

export type TGetCourseByIdType = z.infer<typeof ZGetCourseByIdSchema>;

////////////////////////////
// Creator Router Schemas //
////////////////////////////

export const ZCreateCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.string().transform((str) =>
    str
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
  ),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Invalid image URL").optional(),
  price: z.number().min(0, "Price must be non-negative"),
  isPublished: z.boolean().default(false),
});

export type TCreateCourseType = z.infer<typeof ZCreateCourseSchema>;
