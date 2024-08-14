"use server";

import { z } from "zod";
import { actionClient } from "./safe-action";
import { cookies } from "next/headers";
import { dub } from "../dub";
import { nanoid } from "nanoid";

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

// Fake signup logic and store user in cookies
export const signUpUser = actionClient
  .schema(signupSchema)
  .action(async ({ parsedInput }) => {
    const clickId = cookies().get("dclid")?.value;

    if (!clickId) {
      console.error("No clickId found in cookies. Skipping signup.");
      return;
    }

    const user = {
      ...parsedInput,
      id: nanoid(),
      image: "https://api.dicebear.com/9.x/pixel-art/svg",
    };

    cookies().set("user", JSON.stringify(user));

    console.log("Signed up user", user);

    dub.track.lead({
      clickId,
      eventName: "Sign Up",
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerAvatar: user.image,
    });

    cookies().delete("dclid");

    return { ok: true };
  });
