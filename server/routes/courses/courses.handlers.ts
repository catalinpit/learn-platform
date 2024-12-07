import type { Handler } from "hono";

import type { AppBindings } from "~/shared/types";

import db from "@/db";

export const list: Handler<AppBindings> = async (c) => {
  const users = await db.user.findMany();

  return c.json(users);
};
