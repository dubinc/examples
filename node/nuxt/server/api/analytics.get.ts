import { dub } from "../utils/dub";

export default defineEventHandler(async () => {
  try {
    const result = await dub.analytics.retrieve({
      linkId: "LINK_ID",
      interval: "7d",
      event: "clicks",
      groupBy: "timeseries",
    });

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
});
