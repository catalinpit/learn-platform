import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import NotFound from "./components/not-found";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { routeTree } from "./routeTree.gen";
import { LoadingSpinner } from "./components/ui/loading-spinner";

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { auth: undefined, queryClient },
    defaultPreload: "intent",
    defaultPendingComponent: () => {
      return <LoadingSpinner fullScreen />;
    },
    defaultNotFoundComponent: () => {
      return <NotFound />;
    },
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
