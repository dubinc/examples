import { json } from "@remix-run/node";
import { dub } from "~/dub";
import { ClicksTimeseries } from "dub/models/components";

export const loader = async () => {
  try {
    const result = await dub.analytics.retrieve({
      linkId: "clv3o9p9q000au1h0mc7r6l63",
      interval: "7d",
      event: "clicks",
      groupBy: "timeseries",
    });

    const timeseries = result as ClicksTimeseries[];

    return json(timeseries, 200);
  } catch (error: any) {
    console.error(error);
    return json(error, 400);
  }
};
