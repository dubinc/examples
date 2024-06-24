import { NextRequest, NextResponse } from "next/server";
import { dub } from "@/dub";
import { ClicksTimeseries } from "dub/models/components";

export async function GET(req: NextRequest) {
  try {
    const result = await dub.analytics.retrieve({
      linkId: "clv3o9p9q000au1h0mc7r6l63",
      interval: "7d",
      event: "clicks",
      groupBy: "timeseries",
    });

    const timeseries = result as ClicksTimeseries[];

    return NextResponse.json(timeseries);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
