import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import NotFound from "./components/not-found";

import { routeTree } from "./routeTree.gen";
import "./index.css";
import { LoadingSpinner } from "./components/ui/loading-spinner";

const queryClient = new QueryClient();

export function createRouter() {
  return createTanstackRouter({
    routeTree,
    context: { auth: undefined, queryClient },
    defaultPendingComponent: () => {
      return <LoadingSpinner fullScreen />;
    },
    defaultNotFoundComponent: () => {
      return <NotFound />;
    },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
