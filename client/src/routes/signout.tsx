import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

import { signOut } from "@/lib/auth-client";

export const Route = createFileRoute("/signout")({
  component: SignOut,
});

function SignOut() {
  const router = useRouter();

  useEffect(() => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.navigate({ to: "/" });
        },
      },
    });
  }, []);

  return null;
}
