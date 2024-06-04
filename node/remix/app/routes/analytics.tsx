import { json } from "@remix-run/node";
import { dub } from "~/dub";

export const loader = async () => {
  try {
    const result = await dub.analytics.retrieve({
      linkId: "LINK_ID",
      interval: "7d",
      event: "clicks",
      groupBy: "timeseries",
    });

    return json(result, 200);
  } catch (error: any) {
    console.error(error);
    return json(error, 400);
  }
};
