import type { ErrorHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";

import env from "@/env";

import { INTERNAL_SERVER_ERROR, OK } from "../utils/http-status-codes.js";

const onError: ErrorHandler = (err, c) => {
  const currentStatus = "status" in err
    ? err.status
    : c.newResponse(null).status;
  const statusCode = currentStatus !== OK
    ? (currentStatus as StatusCode)
    : INTERNAL_SERVER_ERROR;

  const envConfig = c.env?.NODE_ENV || env?.NODE_ENV;
  return c.json(
    {
      message: err.message,

      stack: envConfig === "production"
        ? undefined
        : err.stack,
    },
    statusCode,
  );
};

export default onError;
