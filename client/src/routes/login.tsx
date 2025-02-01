import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth/login-form";

export const Route = createFileRoute("/login")({
  component: Login,
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

function Login() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <LoginForm />
    </div>
  );
}
