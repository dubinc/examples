"use client";

import { trackLead } from "@/actions/trackLead";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function DubAttribution() {
  const { user } = useUser();

  useEffect(() => {
    if (!user || user.publicMetadata.dubClickId) return;

    console.log("tracking sign up");
    // The user is loaded but hasn't been persisted to Dub yet:
    trackLead({
      id: user.id,
      name: user.fullName!,
      email: user.primaryEmailAddress?.emailAddress,
      avatar: user.imageUrl,
    }).then(async (res) => {
      if (res.ok) await user.reload();
      else console.error(res.error);
    });
  }, [user]);

  return null;
}
