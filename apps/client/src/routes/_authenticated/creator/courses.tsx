import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/creator/courses")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/creator/courses"!</div>;
}
