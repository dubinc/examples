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

// Sign out the current user
export const signOut = async () => {
  const session = await getSession();

  session?.destroy();
  revalidatePath("/");
};
