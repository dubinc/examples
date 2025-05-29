"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "../../lib/segment-client";

export function SegmentAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    analytics.page();
  }, [pathname, searchParams]);

  return null;
}
