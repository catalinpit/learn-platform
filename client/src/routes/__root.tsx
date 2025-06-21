import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { NavBar } from "@/components/nav-bar";
import type { Session } from "@/lib/auth-client";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
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
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow mx-auto max-w-6xl pt-12 w-full">
          <Outlet />
        </main>
        <Footer />
        <Toaster richColors={true} toastOptions={{}} />
        <TanStackRouterDevtools />
      </div>
    </ThemeProvider>
  );
}
