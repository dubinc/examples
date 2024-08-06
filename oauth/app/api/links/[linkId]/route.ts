import { getSession } from "@/lib/actions";
import { dubClient } from "@/lib/dub";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: { linkId: string } }
) {
  try {
    const session = await getSession();

    if (!session || !session.accessToken)
      throw new Error("You must be logged in to delete a short link.");

    // In production, you should read the `accessToken` from the your database for the user logged in.
    const { accessToken } = session;
    const id = params.linkId;

    if (!id) throw new Error("A short link ID is required.");

    const dub = dubClient(accessToken);

    await dub.links.delete(id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.error.message }, { status: 400 });
  }
}
