import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { signOut } from "@/lib/auth-client";

export const Route = createFileRoute("/signout")({
  component: SignOut,
});

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/", search: { search: "", page: 1, perPage: 10 } });
        },
      },
    });
  }, []);

  return null;
}
