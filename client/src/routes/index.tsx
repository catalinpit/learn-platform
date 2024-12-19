import { createFileRoute } from "@tanstack/react-router";

import { useSession } from "@/lib/auth-client";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: session, isPending, error } = useSession();

  console.log({ session, isPending, error });

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
