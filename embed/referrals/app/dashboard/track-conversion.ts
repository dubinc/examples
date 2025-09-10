"use server";

import { dub } from "@/lib/dub";
import { generateRandomName } from "@/lib/names";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function trackConversion() {
  const cookieStore = await cookies();
  const dubId = cookieStore.get("dub_id")?.value;

  if (!dubId) {
    throw new Error("No dub_id cookie found");
  }

  const randomName = generateRandomName();
  const randomEmail = `${randomName
    .toLowerCase()
    .replaceAll(" ", "-")}@example.com`;

  // random sale amount from [900, 1900, 2900, 3900, 4900]
  const randomSaleAmount = [900, 1900, 2900, 3900, 4900][
    Math.floor(Math.random() * 5)
  ];

  // track sale with direct sale tracking
  const sale = await dub.track.sale({
    clickId: dubId,
    customerExternalId: crypto.randomUUID(),
    customerName: randomName,
    customerEmail: randomEmail,
    eventName: "Invoice paid",
    amount: randomSaleAmount,
    currency: "usd",
    paymentProcessor: "stripe",
    invoiceId: crypto.randomUUID(),
  });

  console.log("Conversion tracked (via direct sale tracking)", { sale });

  // sleep for 1.5s for event to be fully tracked
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // refresh the page
  redirect("/dashboard");
}
