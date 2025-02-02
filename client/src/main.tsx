import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useSession } from "@/lib/auth-client";
import NotFound from "./components/not-found";

import { routeTree } from "./routeTree.gen";
import "./index.css";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { auth: undefined, queryClient },
  defaultNotFoundComponent: () => {
    return <NotFound />;
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function RouterWithAuthContext() {
  const { data: auth, isPending, error } = useSession();

  if (!isPending && !error) {
    return <RouterProvider router={router} context={{ auth }} />;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterWithAuthContext />
    </QueryClientProvider>
  </StrictMode>
);
