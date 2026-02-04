import { authQueryOptions } from "@/lib/auth/queries";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    });
    if (!user) {
      throw redirect({
        to: "/login",
      });
    }

    // re-return to update type as non-null for child routes
    return { user };
  },
});
