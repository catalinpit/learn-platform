import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { NavBar } from "@/components/nav-bar";

export const Route = createRootRoute({
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
