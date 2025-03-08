import { createFileRoute, redirect } from "@tanstack/react-router";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: search.token as string,
    };
  },
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
      <ResetPasswordForm />
    </div>
  );
}
