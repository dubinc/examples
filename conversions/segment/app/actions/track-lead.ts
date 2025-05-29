"use server";

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
  segment.track({
    userId: id,
    event: "Sign Up",
    context: {
      traits: {
        name,
        email,
        avatar,
      },
    },
  });
}
