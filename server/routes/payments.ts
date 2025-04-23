import { zValidator } from "@hono/zod-validator";

import { createRouter } from "@/lib/create-app";
import { client as polarClient } from "@/lib/polar-client";
import { loggedIn } from "@/middleware/auth";
import { ZCreateCheckoutSchema } from "@/shared/types";

const router = createRouter().post(
  "/checkout",
  loggedIn,
  zValidator("json", ZCreateCheckoutSchema, (result, c) => {
    if (!result.success) {
      return c.json("Invalid body", 400);
    }
  }),
  async (c) => {
    const { productId } = c.req.valid("json");
    const user = c.get("Variables").user;

    if (!user) {
      return c.json("Unauthorized", 401);
    }

    try {
      const checkout = await polarClient.checkouts.create({
        productId: String(productId),
        customerExternalId: user.id,
        successUrl: "http://localhost:5173/success?checkout_id={CHECKOUT_ID}",
      });

      return c.json({ url: checkout.url });
    } catch (error) {
      return c.json("Failed to create checkout session", 500);
    }
  },
);

export default router;
