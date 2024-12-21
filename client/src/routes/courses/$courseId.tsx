import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/$courseId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/courses/$courseId"!</div>;
}
