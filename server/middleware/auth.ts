import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";

import { auth } from "@/lib/auth";

import type { AppBindings, AuthType } from "../shared/types";

export const corsMiddleware = cors({
  origin: "http://localhost:5173",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
});

export const authMiddleware = createMiddleware<{
  Bindings: AppBindings;
  Variables: AuthType;
}>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("Variables", { user: null, session: null });

    return next();
  }

  c.set("Variables", {
    user: session.user,
    session: session.session,
  });

  return next();
});
