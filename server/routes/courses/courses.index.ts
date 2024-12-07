import { createRouter } from "@/lib/create-app";

import * as handlers from "./courses.handlers";
import * as routes from "./courses.routes";

const router = createRouter()
  .all(routes.list.path, handlers.list);

export default router;
