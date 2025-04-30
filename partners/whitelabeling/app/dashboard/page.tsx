import { dub } from "@/lib/dub";
import { ReferralEmbed } from "./page-client";
import { getSession } from "@/lib/auth";
import { env } from "@/lib/env";
import { redirect } from "next/navigation";

export default async function Page() {
  const publicToken = await createPublicToken();

  if (!publicToken) {
    return <div>Failed to create public token.</div>;
  }

  return <ReferralEmbed publicToken={publicToken} />;
}

async function createPublicToken() {
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
  }

  const { publicToken } = await dub.embedTokens.referrals({
    programId: env.DUB_PROGRAM_ID,
    partner: {
      name: session.user.name || "",
      email: session.user.email || "",
      image: session.user.image || "",
    },
  });

  return publicToken;
}
