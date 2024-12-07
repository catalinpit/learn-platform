import { createRouter } from "@/lib/create-app";

const router = createRouter();

router.get("/", async (c) => {
  return c.json({ message: "lol!" });
});

export default router;
