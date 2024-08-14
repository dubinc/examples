import Stripe from "stripe";
import { cookies } from "next/headers";

export const getStripe = () => {
  const config = getStripeConfig();

  if (!config.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found in cookies");
  }

  const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    // apiVersion: "2022-11-15",
    appInfo: {
      name: "Dub Conversions",
      version: "0.1.0",
    },
  });

  return stripe;
};

export const getStripeConfig = () => {
  const cookieStore = cookies();

  return {
    STRIPE_SECRET_KEY: cookieStore.get("STRIPE_SECRET_KEY")?.value,
    STRIPE_PUBLISHABLE_KEY: cookieStore.get("STRIPE_PUBLISHABLE_KEY")?.value,
    STRIPE_PRICE_ID: cookieStore.get("STRIPE_PRICE_ID")?.value,
  };
};
