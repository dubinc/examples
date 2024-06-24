import { NextRequest, NextResponse } from "next/server";
import { dub } from "@/dub";

export async function POST(req: NextRequest) {
  try {
    const result = await dub.links.create({
      url: "https://www.google.com",
      externalId: "12345", // Optional
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
