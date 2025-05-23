"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function Booker() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "conversions-demo" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <Cal
      namespace="conversions-demo"
      calLink="team/dub/conversions-demo"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
