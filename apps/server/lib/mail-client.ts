import { Resend } from "resend";

import env from "@/env";

export const client = new Resend(env.RESEND_KEY);
