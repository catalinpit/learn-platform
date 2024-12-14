import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "@tanstack/react-router";

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
