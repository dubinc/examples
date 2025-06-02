"use server";

import { segment } from "../lib/segment-server";

export async function trackSale({ id }: { id: string }) {
  segment.track({
    userId: id,
    event: "Order Completed",
    properties: {
      payment_processor: "stripe",
      order_id: crypto.randomUUID(),
      currency: "USD",
      revenue: 100,
    },
    integrations: {
      All: true,
    },
  });
}

export async function handleSale() {
  await trackSale({
    id: "132f5574-8015-4510-9f5d-7719ef431121",
  });
}
