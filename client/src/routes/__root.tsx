import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  RouterProvider,
  useRouter,
} from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import appCss from "@/index.css?url";

import { NavBar } from "@/components/nav-bar";
import { useSession, type Session } from "@/lib/auth-client";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";

export interface MyRouterContext {
  auth: Session | null | undefined;
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

export function RouterWithAuthContext() {
  const { data: auth, isPending, error } = useSession();
  const router = useRouter();

  if (!isPending && !error) {
    return <RouterProvider router={router} context={{ auth }} />;
  }
}

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
        {children}
        <Scripts />
      </body>
    </html>
  );
}
