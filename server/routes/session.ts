import db from "@/db";
import { createRouter } from "@/lib/create-app";

const router = createRouter().get("/session", async (c) => {
  const { session, user } = c.get("Variables");

  if (!user) {
    return c.json({ message: "Not found" }, 401);
  }

  const dbUser = await db.user.findUnique({ where: { id: user?.id } });

  return c.json({
    session,
    user: {
      ...user,
      ...dbUser,
    },
  });
});

export default router;
