import { getSession } from "@/lib/actions";
import { dubClient } from "@/lib/dub";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession();

  if (!session || !session.accessToken) {
    return NextResponse.json({
      error: "You must be logged in to create a short link",
    });
  }

  // In production, you should read the `accessToken` from the your database for the user logged in.
  const { accessToken } = session;
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" });
  }

  const dub = dubClient(accessToken);

  const { shortLink } = await dub.links.create({ url });

  return NextResponse.json({ shortLink });
}
