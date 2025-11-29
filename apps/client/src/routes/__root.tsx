import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import appCss from "@/index.css?url";

import { NavBar } from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        title: "Learn Course",
      },
      {
        name: "description",
        content: "Learn Course is a platform for learning courses",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
});

function Providers() {
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow mx-auto max-w-6xl pt-12 w-full">
          <Outlet />
        </main>
        <Footer />
        <Toaster richColors={true} toastOptions={{}} />
      </div>
    </QueryClientProvider>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <Providers />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
