import { getStripeConfig } from "@/lib/stripe";
import ConfigPageClient from "./page-client";

export default function ConfigPage() {
  return <ConfigPageClient config={getStripeConfig()} />;
}
