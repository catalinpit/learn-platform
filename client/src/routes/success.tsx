import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/success")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    checkout_id: String(search.checkout_id),
    customer_session_token: String(search.customer_session_token),
  }),
});

function RouteComponent() {
  const { checkout_id, customer_session_token } = Route.useSearch();

  console.log(checkout_id, customer_session_token);

  return <div>Hello "/success"!</div>;
}
