"use server";

import { z } from "zod";
import { actionClient } from "./safe-action";
import { cookies } from "next/headers";

export const stripeConfigSchema = z.object({
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
  STRIPE_PRICE_ID: z.string(),
});

export const updateStripeConfigAction = actionClient
  .schema(stripeConfigSchema)
  .action(async ({ parsedInput }) => {
    const { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_PRICE_ID } =
      parsedInput;

    cookies().set("STRIPE_SECRET_KEY", STRIPE_SECRET_KEY);
    cookies().set("STRIPE_PUBLISHABLE_KEY", STRIPE_PUBLISHABLE_KEY);
    cookies().set("STRIPE_PRICE_ID", STRIPE_PRICE_ID);

    return { ok: true };
  });
