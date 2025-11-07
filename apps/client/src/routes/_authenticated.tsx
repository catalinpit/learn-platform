import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    if (!context.auth?.user) {
      throw redirect({
        to: "/login",
      });
    }

    return context.auth.user;
  },
});
