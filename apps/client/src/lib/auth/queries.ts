import { queryOptions } from "@tanstack/react-query";
import { $getUser } from "./functions";

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["user"],
    queryFn: ({ signal }) => $getUser({ signal }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

export type AuthQueryResult = Awaited<ReturnType<typeof $getUser>>;
