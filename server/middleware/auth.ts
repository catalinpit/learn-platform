import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

import { auth } from "@/lib/auth";

import type { AppBindings, AuthType } from "../shared/types";

export const corsMiddleware = cors({
  origin: ["http://localhost:5173", "https://sf.catalins.tech"],
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

export const loggedIn = createMiddleware<{
  Bindings: AppBindings;
  Variables: AuthType;
}>(async (c, next) => {
  const user = c.get("Variables").user;

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  await next();
});
