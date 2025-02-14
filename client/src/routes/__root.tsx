import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { NavBar } from "@/components/nav-bar";
import type { Session } from "@/lib/auth-client";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

export interface MyRouterContext {
  auth: Session | null | undefined;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Root() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="learn-course-ui-theme">
      <NavBar />
      <div className="mx-auto max-w-6xl pt-12">
        <Outlet />
      </div>
      <Toaster richColors={true} toastOptions={{}} />
      <TanStackRouterDevtools />
    </ThemeProvider>
  );
}
