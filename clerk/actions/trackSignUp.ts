"use server";

import { dub } from "@/lib/dub";
import { clerkClient } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export async function trackSignUp({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  try {
    const cookieStore = await cookies();
    const dub_id = cookieStore.get("dub_id")?.value;
    if (dub_id) {
      // Send lead event to Dub
      await dub.track.lead({
        clickId: dub_id,
        eventName: "Sign Up",
        customerId: id,
        customerEmail: email,
      });

      // Delete the dub_id cookie
      cookieStore.set("dub_id", "", {
        expires: new Date(0),
      });
    }

    const clerk = await clerkClient();
    await clerk.users.updateUser(id, {
      publicMetadata: {
        __dub: true,
      },
    });

    return { ok: true };
  } catch (error) {
    console.error("Failed to track Dub lead event", error);
    return { error: "Failed to track Dub lead event", ok: false };
  }
}
