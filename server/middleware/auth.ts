import type { MiddlewareHandler } from "hono";

import { auth } from "@/lib/auth";

import type { AppBindings, AuthType } from "~/shared/types";

export const authMiddleware: MiddlewareHandler<{
  Bindings: AppBindings;
  Variables: AuthType;
}> = async (c, next) => {
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
};
