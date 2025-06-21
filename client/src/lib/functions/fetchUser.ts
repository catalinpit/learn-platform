import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { authClient } from "../auth-client";

export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const request = getWebRequest();

  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  });

  return data;
});
