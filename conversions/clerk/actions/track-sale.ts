"use server";

import { dub } from "@/lib/dub";
import { auth } from "@clerk/nextjs/server";

export async function trackSale(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthorized", ok: false };

  const amount = parseInt((formData.get("amount") as string | null) || "0");
  if (!amount) return { message: "Amount is required", ok: false };

  try {
    // Send lead event to Dub
    await dub.track.sale({
      customerExternalId: userId,
      eventName: "Sale",
      amount: Math.floor(amount * 100),
      paymentProcessor: "stripe",
    });

    return { ok: true, message: "Success" };
  } catch (error) {
    console.error("Failed to track Dub sale event", error);
    return { message: "Failed to track Dub sale event", ok: false };
  }
}
