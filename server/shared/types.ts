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
  tags: z.array(z.string()),
  content: z.string().min(1, "Content is required"),
  videoUrls: z.array(z.string().url("Invalid video URL")),
  coverImage: z.string().url("Invalid image URL").optional(),
  price: z.number().min(0, "Price must be non-negative"),
  isPublished: z.boolean().default(false),
});

export type TCreateCourseType = z.infer<typeof ZCreateCourseSchema>;
