import { auth } from "@/lib/auth";
import { createRouter } from "@/lib/create-app";

const router = createRouter();

router.on(["POST", "GET"], "/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

router.get("/session", async (c) => {
  const { session, user } = c.get("Variables");

  if (!user) {
    return c.json({ message: "Not found" }, 401);
  }

  return c.json({
    session,
    user,
  });
});

export default router;
