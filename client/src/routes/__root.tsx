import type { ReactNode } from "react";
import {
  createRootRouteWithContext,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { NavBar } from "@/components/nav-bar";
import type { Session } from "@/lib/auth-client";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import "@/index.css";
import { fetchUser } from "@/lib/functions/fetchUser";

export interface MyRouterContext {
  auth: Session | null | undefined;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Learn Platform",
        description: "Learn from the best and get the best out of your learning",
      },
    ],
  }),
  beforeLoad: async ({ context }) => {
    const data = await context.queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: fetchUser,
    });

    return {
      auth: data,
    };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
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
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
