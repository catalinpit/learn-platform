import { zValidator } from "@hono/zod-validator";

import db from "@/db";
import { createRouter } from "@/lib/create-app";
import { loggedIn } from "@/middleware/auth";

const router = createRouter().get("/user-settings", loggedIn, async (c) => {
  return c.json("user-settings");
});

export default router;
