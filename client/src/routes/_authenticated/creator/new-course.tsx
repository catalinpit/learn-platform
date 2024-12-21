import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/creator/new-course")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/creator/new-course"!</div>;
}
