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
  console.log("Tracking lead", {
    id,
    name,
    email,
    avatar,
  });

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
    integrations: {
      All: true,
    },
  });
}

export async function handleSignup() {
  const id = crypto.randomUUID();

  await trackLead({
    id,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://example.com/avatar.png",
  });
}
