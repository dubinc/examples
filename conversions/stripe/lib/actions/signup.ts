"use server";

import { z } from "zod";
import { actionClient } from "./safe-action";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";
import { getStripe } from "../stripe";
import { redirect } from "next/navigation";
import { getConfig } from "../config";
import { getDub } from "../dub";
import { setSession } from "../session";

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

// Fake signup logic and store user in cookies
export const signUpUser = actionClient
  .schema(signupSchema)
  .action(async ({ parsedInput }) => {
    const randomId = nanoid();

    const user = {
      ...parsedInput,
      id: randomId,
    };

    // fake a 150ms delay
    await new Promise((resolve) => setTimeout(resolve, 150));
    setSession(user);

    const clickId = cookies().get("dub_id")?.value;

    if (!clickId) {
      throw new Error("No clickId found in cookies. Skipping checkout flow.");
    }

    const dub = getDub();
    await dub.track.lead({
      clickId,
      eventName: "Sign Up",
      customerExternalId: user.id,
      customerName: user.name,
      customerEmail: user.email,
    });

    cookies().delete("dub_id");

    const stripe = getStripe();
    const config = getConfig();

    /*
    This example uses option 3 (Stripe Customers) in the Stripe integration guide: 
    https://dub.co/docs/conversions/sales/stripe#option-3%3A-using-stripe-customers

    If you're using Stripe payment links or Stripe checkout.session.create, check out the other examples in the Stripe integration guide.
    */

    // Create a customer
    const customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
      metadata: {
        dubClickId: clickId,
        dubCustomerId: user.id,
      },
    });

    // Create a subscription
    const { url } = await stripe.checkout.sessions.create({
      customer: customer.id,
      success_url: `${
        process.env.VERCEL === "1"
          ? "https://conversions.dub.sh"
          : "http://localhost:3000"
      }?step=success`,
      line_items: [
        {
          price: config.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
    });

    if (url) {
      redirect(url);
    }

    return { ok: true, user, checkoutUrl: url };
  });
