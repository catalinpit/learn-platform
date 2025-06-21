import { getSession } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const { data } = await getSession();
    
    if (!data?.user) {
      throw redirect({
        to: "/login",
      });
    }

    return data.user;
  },
});
