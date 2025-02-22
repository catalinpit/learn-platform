import { createFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";

import { PasswordResetForm } from "@/components/auth/password-reset-form";

export const Route = createFileRoute("/reset-password")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.auth?.user) {
      throw redirect({
        to: "/",
        search: {
          search: "",
          page: 1,
          perPage: 10,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <PasswordResetForm />
    </div>
  );
}
