import { createFileRoute, redirect } from "@tanstack/react-router";
import { RegisterForm } from "@/components/auth/register-form";

export const Route = createFileRoute("/register")({
  component: Register,
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

function Register() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <RegisterForm />
    </div>
  );
}
