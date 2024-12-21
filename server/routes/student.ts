import { zValidator } from "@hono/zod-validator";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { loggedIn } from "@/middleware/auth";
import { ZCreateCourseSchema } from "@/shared/types";

const router = createRouter();

export default router;
