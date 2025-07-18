"use server";

import { dub } from "@/lib/dub";
import { clerkClient } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export async function trackLead({
  id,
  name,
  email,
  avatar,
}: {
  id: string;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
}) {
  if (!process.env.DUB_API_KEY) {
    return {
      ok: false,
      error:
        "[Dub Analytics]: DUB_API_KEY not set. Signup event (lead) will not be tracked.",
    };
  }

  try {
    const cookieStore = await cookies();
    const dubId = cookieStore.get("dub_id")?.value;
    if (dubId) {
      // Send lead event to Dub
      await dub.track.lead({
        clickId: dubId,
        eventName: "Sign Up",
        customerExternalId: id,
        customerName: name,
        customerEmail: email,
        customerAvatar: avatar,
      });

      // Delete the dub_id cookie
      cookieStore.set("dub_id", "", {
        expires: new Date(0),
      });
    }

    const clerk = await clerkClient();
    await clerk.users.updateUser(id, {
      publicMetadata: {
        dubClickId: dubId || "n/a",
      },
    });

    return { ok: true };
  } catch (error) {
    console.error("Failed to track Dub lead event", error);
    return { ok: false, error: "Failed to track Dub lead event" };
  }
}
