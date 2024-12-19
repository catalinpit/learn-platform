import { hc } from "hono/client";
import type { AppType } from "../../../server/shared/types";

const client = hc<AppType>("");
