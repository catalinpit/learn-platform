import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { NavBar } from "@/components/nav-bar";
import type { Session } from "@/lib/auth-client";

export interface MyRouterContext {
  auth: Session | null | undefined;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Root() {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-3xl mt-12">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
