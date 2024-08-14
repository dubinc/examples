import ConfigPageClient from "./page-client";
import { cookies } from "next/headers";

export default function ConfigPage() {
  const cookieStore = cookies();

  const config = {
    STRIPE_SECRET_KEY: cookieStore.get("STRIPE_SECRET_KEY")?.value,
    STRIPE_PUBLISHABLE_KEY: cookieStore.get("STRIPE_PUBLISHABLE_KEY")?.value,
    STRIPE_PRICE_ID: cookieStore.get("STRIPE_PRICE_ID")?.value,
  };

  return <ConfigPageClient config={config} />;
}
