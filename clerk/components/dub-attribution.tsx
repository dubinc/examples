"use client";

import { trackSignUp } from "@/actions/trackSignUp";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function DubAttribution() {
  const { user } = useUser();

  useEffect(() => {
    if (!user?.publicMetadata || user.publicMetadata.__dub) return;

    console.log("tracking sign up");
    // The user is loaded but hasn't been persisted to Dub yet:
    trackSignUp({
      id: user.id,
      email: user.primaryEmailAddress!.emailAddress,
    }).then(async (res) => {
      if (res.ok) await user.reload();
    });
  }, [user]);

  return null;
}
