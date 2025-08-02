import { hc } from "hono/client";

import type { AppType } from "../shared/types";

// assign the client to a variable to calculate the type when compiling
const client = hc<AppType>("");
export type Client = typeof client;

export function hcWithType(...args: Parameters<typeof hc>): Client {
  return hc<AppType>(...args);
}
