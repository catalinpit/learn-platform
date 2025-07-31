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
import { getWebRequest } from "@tanstack/react-start/server";

import { NavBar } from "@/components/nav-bar";
import { getSession, type Session } from "@/lib/auth-client";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { createServerFn } from "@tanstack/react-start";

export interface MyRouterContext {
  auth: Session | null | undefined;
  queryClient: QueryClient;
}

const fetchAuth = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getSession({
    fetchOptions: {
      headers: {
        cookie: getWebRequest().headers.get("cookie") || "",
      },
    },
  });

  if (!session.data) {
    return null;
  }

  return {
    auth: session.data,
  };
});

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    const auth = await fetchAuth();

    return { auth };
  },
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
        {children}
        <Scripts />
      </body>
    </html>
  );
}
