"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { dubClient } from "./dub";

// Get the current user from the session cookie
export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session) {
    return null;
  }

  return session;
};

// Logged out
export const loggedOut = async () => {
  const session = await getSession();

  session?.destroy();
  revalidatePath("/");
};

// Create a short link
export const createLink = async (formData: FormData) => {
  const session = await getSession();

  if (!session || !session.accessToken) {
    return null;
  }

  // NOTE:
  // In production, you should read the `accessToken` from the your database for the user logged in.
  const { accessToken } = session;
  const url = formData.get("url") as string;

  if (!url) {
    throw new Error("URL is required");
  }

  const dub = dubClient(accessToken);

  const { shortLink } = await dub.links.create({ url });

  console.log({ shortLink });

  return shortLink;
};
