"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";
import { revalidatePath } from "next/cache";

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
