import type { Handler } from "hono";

import type { AppBindings } from "@/lib/types";

export const list: Handler<AppBindings> = (c) => {
  return c.json({
    name: "Learn hono",
    description: "Learn hono is a course that teaches you how to learn hono with tools such as hono, hono, and hono.",
  });
};
