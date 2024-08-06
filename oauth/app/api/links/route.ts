import { getSession } from "@/lib/actions";
import { dubClient } from "@/lib/dub";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session || !session.accessToken) {
      throw new Error("You must be logged in to create a short link.");
    }

    // In production, you should read the `accessToken` from the your database for the user logged in.
    const { accessToken } = session;
    const { url } = await req.json();

    if (!url) {
      throw new Error("A destination URL is required.");
    }

    const dub = dubClient(accessToken);

    const { key, domain } = await dub.links.create({ url });

    return NextResponse.json({ key, domain, url });
  } catch (error: any) {
    return NextResponse.json({ error: error.error.message }, { status: 400 });
  }
}
