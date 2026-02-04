import { getRequest } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { authClientVanilla } from "../auth-client";

export const $getUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await authClientVanilla.getSession({
    fetchOptions: {
      headers: getRequest().headers,
    }
  });
  return session.data?.user || null;
});
