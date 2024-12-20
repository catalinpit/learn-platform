import type { PinoLogger } from "hono-pino";

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

export { type AppType };

////////////////////////////
// Courses Router Schemas //
////////////////////////////
export const GetCourseByIdSchema = z.object({
  id: z.string(),
});

export type GetCourseByIdType = z.infer<typeof GetCourseByIdSchema>;
