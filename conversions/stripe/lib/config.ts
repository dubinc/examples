import { cookies } from "next/headers";

export type Config = {
  DUB_API_KEY?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_PUBLISHABLE_KEY?: string;
  STRIPE_PRICE_ID?: string;
};

export const setConfig = ({
  DUB_API_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_PRICE_ID,
}: Config) => {
  DUB_API_KEY && cookies().set("DUB_API_KEY", DUB_API_KEY);
  STRIPE_SECRET_KEY && cookies().set("STRIPE_SECRET_KEY", STRIPE_SECRET_KEY);
  STRIPE_PUBLISHABLE_KEY &&
    cookies().set("STRIPE_PUBLISHABLE_KEY", STRIPE_PUBLISHABLE_KEY);
  STRIPE_PRICE_ID && cookies().set("STRIPE_PRICE_ID", STRIPE_PRICE_ID);
};

export const getConfig = () => {
  const cookieStore = cookies();

  return {
    DUB_API_KEY: cookieStore.get("DUB_API_KEY")?.value,
    STRIPE_SECRET_KEY: cookieStore.get("STRIPE_SECRET_KEY")?.value,
    STRIPE_PUBLISHABLE_KEY: cookieStore.get("STRIPE_PUBLISHABLE_KEY")?.value,
    STRIPE_PRICE_ID: cookieStore.get("STRIPE_PRICE_ID")?.value,
  };
};
