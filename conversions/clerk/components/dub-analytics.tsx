"use client";

import { trackLead } from "@/actions/track-lead";
import { useUser } from "@clerk/nextjs";
import { Analytics, AnalyticsProps } from "@dub/analytics/react";
import { useEffect } from "react";

export function DubAnalytics(props: AnalyticsProps) {
  const { user } = useUser();

  useEffect(() => {
    if (!user || user.publicMetadata.dubClickId) return;

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

  return <Analytics {...props} />;
}
