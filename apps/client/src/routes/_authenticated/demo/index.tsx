import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/demo/")({
  component: RouteComponent,
});

function RouteComponent() {
  const context = Route.useRouteContext();
  return <div>
    <pre>
      {JSON.stringify(context.user, null, 2)}
    </pre>
  </div>;
}
