import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { getSession } from "../auth-client";

export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
    const { headers } = getWebRequest();
    const { data } = await getSession({ fetchOptions: { headers } });

    return data || null;
});
