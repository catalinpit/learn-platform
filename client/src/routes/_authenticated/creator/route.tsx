import { createFileRoute, redirect } from "@tanstack/react-router";
import { canCreateCourse } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/creator")({
  loader: async (ctx) => {
    const user = ctx.context?.auth?.user.roles;

    if (user && !canCreateCourse(user)) {
      throw redirect({ to: "/", search: { search: "", page: 1, perPage: 10 } });
    }
  },
});
