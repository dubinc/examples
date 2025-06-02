"use server";

import { cookies } from "next/headers";
import { segment } from "../lib/segment-server";

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
  const cookieStore = await cookies();
  const clickId = cookieStore.get("dub_id")?.value;

  segment.track({
    userId: id,
    event: "Sign Up",
    context: {
      traits: {
        name,
        email,
        avatar,
        clickId,
      },
    },
    integrations: {
      All: true,
    },
  });
}

export async function handleSignup() {
  await trackLead({
    id: crypto.randomUUID(),
    name: "John Doe ",
    email: "john.doe@example.com",
  });
}
