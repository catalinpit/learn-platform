import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useSession } from "@/lib/auth-client";

import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({ routeTree, context: { auth: undefined } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

export function InnerApp() {
  const { data: auth, isPending, error } = useSession();

  if (!isPending && !error) {
    return <RouterProvider router={router} context={{ auth }} />;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InnerApp />
    </QueryClientProvider>
  </StrictMode>
);
