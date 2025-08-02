import { QueryClient } from "@tanstack/react-query";
import { createRouter as createRouterTanstack } from "@tanstack/react-router";
import NotFound from "./components/not-found";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { routeTree } from "./routeTree.gen";
import { LoadingSpinner } from "./components/ui/loading-spinner";

export function createRouter() {
  const queryClient = new QueryClient();

  return routerWithQueryClient(
    createRouterTanstack({
      routeTree,
      context: { auth: undefined, queryClient },
      defaultPreload: "intent",
      defaultPendingComponent: () => {
        return <LoadingSpinner fullScreen />;
      },
      defaultNotFoundComponent: () => {
        return <NotFound />;
      },
    }),
    queryClient
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
