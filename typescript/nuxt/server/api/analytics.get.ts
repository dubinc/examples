import { dub } from "../utils/dub";
import { ClicksTimeseries } from "dub/models/components";

// Retrieve the timeseries analytics for the last 7 days for a link
export default defineEventHandler(async () => {
  try {
    const result = await dub.analytics.retrieve({
      linkId: "clv3o9p9q000au1h0mc7r6l63",
      interval: "7d",
      event: "clicks",
      groupBy: "timeseries",
    });

    const timeseries = result as ClicksTimeseries[];

    return timeseries;
  } catch (error) {
    console.error(error);
    return error;
  }
});
