import { NextResponse } from "next/server";
import { dub } from "@/lib/dub";
import { env } from "@/lib/env";
import { getSession } from "@/lib/auth";

export async function POST() {
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { publicToken } = await dub.embedTokens.referrals({
    programId: env.DUB_PROGRAM_ID,
    partner: {
      name: session.user.name || "",
      email: session.user.email || "",
      image: session.user.image || "",
    },
  });

  return NextResponse.json({ publicToken }, { status: 201 });
}
