import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import NotFound from "./components/not-found";

import { routeTree } from "./routeTree.gen";
import "./index.css";
import { LoadingSpinner } from "./components/ui/loading-spinner";

export function createRouter() {
  const queryClient = new QueryClient();

  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { auth: undefined, queryClient },
      scrollRestoration: true,
      defaultPendingComponent: () => {
        return <LoadingSpinner fullScreen />;
      },
      defaultNotFoundComponent: () => {
        return <NotFound />;
      },
    }),
    queryClient,
  );

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
