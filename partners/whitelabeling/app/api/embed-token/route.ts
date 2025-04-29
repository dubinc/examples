import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dub } from "@/lib/dub";
import { env } from "@/lib/env";

export async function POST() {
  const session = await getServerSession(authOptions);

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
