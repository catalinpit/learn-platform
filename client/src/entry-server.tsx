// src/entry-server.tsx
import {
  createRequestHandler,
  renderRouterToString,
  RouterServer,
} from "@tanstack/react-router/ssr/server";
import { createRouter } from "./router";

export function render({ request }: { request: Request }) {
  const handler = createRequestHandler({ request, createRouter });

  return handler(({ request, responseHeaders, router }) =>
    renderRouterToString({
      request,
      responseHeaders,
      router,
      children: <RouterServer router={router} />,
    })
  );
}
