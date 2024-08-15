import Stripe from "stripe";
import { getConfig } from "./config";

export const getStripe = () => {
  const config = getConfig();

  if (!config.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found in cookies");
  }

  const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    appInfo: {
      name: "Dub Conversions",
      version: "0.1.0",
    },
  });

  return stripe;
};
