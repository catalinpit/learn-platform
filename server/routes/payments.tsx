import env from "@/env";
import { createRouter } from "@/lib/create-app";
import { client as mailClient } from "@/lib/mail-client";
import { client as polarClient } from "@/lib/polar-client";
import { loggedIn } from "@/middleware/auth";
import { ZCreateCheckoutSchema, ZGetCheckoutSchema } from "@/shared/types";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { EmailTemplate } from "../react-email-starter/emails/email-template";

const router = createRouter()
  .post(
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
          successUrl: `${env.APP_URL}/success?checkout_id={CHECKOUT_ID}`,
        });

        const { metadata } = await polarClient.products.get({
          id: checkout.product.id,
        });

        await mailClient.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: user.email,
          subject: `Course enrollment confirmation`,
          react: (
            <EmailTemplate
              username={user.name}
              previewText="Enrollment confirmation"
              header="Course enrollment confirmation 🎊"
              emailText="you have successfully enrolled in the course"
              buttonText="Access course"
              // eslint-disable-next-line dot-notation
              actionLink={`${env.APP_URL}/student/courses/${metadata["courseId"]}`}
            />
          ),
        });

        return c.json({ url: checkout.url });
      } catch (error) {
        if (error instanceof z.ZodError) {
          return c.json(
            { error: error.issues.map((issue) => issue.message).join("\n") },
            500,
          );
        }

        return c.json({ error: "Failed to create checkout session" }, 500);
      }
    },
  )
  .get(
    "/checkout/:checkoutId",
    loggedIn,
    zValidator("param", ZGetCheckoutSchema, (result, c) => {
      if (!result.success) {
        return c.json("Invalid checkout ID", 400);
      }
    }),
    async (c) => {
      const { checkoutId } = c.req.valid("param");
      const user = c.get("Variables").user;

      if (!user) {
        return c.json("Unauthorized", 401);
      }

      const checkout = await polarClient.checkouts.get({ id: checkoutId });

      if (checkout.customerExternalId !== user.id) {
        return c.json("Unauthorized", 401);
      }

      const { metadata } = await polarClient.products.get({
        id: checkout.product.id,
      });

      const checkoutDetails = {
        product: {
          id: checkout.product.id,
          name: checkout.product.name,
          // eslint-disable-next-line dot-notation
          courseId: metadata["courseId"],
        },
        status: checkout.status,
      };

      return c.json(checkoutDetails);
    },
  );

export default router;
