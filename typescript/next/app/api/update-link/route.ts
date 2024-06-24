import { NextRequest, NextResponse } from "next/server";
import { dub } from "@/dub";

export async function POST(req: NextRequest) {
  try {
    // Update a link by its linkId
    let result = await dub.links.update("clv3o9p9q000au1h0mc7r6l63", {
      url: "https://www.google.uk",
    });

    // Update a link by its externalId
    result = await dub.links.update("ext_12345", {
      url: "https://www.google.uk",
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
