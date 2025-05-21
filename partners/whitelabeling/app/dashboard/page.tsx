import { dub } from "@/lib/dub";
import { DubEmbed } from "@dub/embed-react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
  const publicToken = await createPublicToken();

  if (!publicToken) {
    return <div>Failed to create public token.</div>;
  }

  return (
    <DubEmbed
      data="referrals"
      token={publicToken}
      options={{
        theme: "system",
        themeOptions: {
          backgroundColor: "#0a0a0a",
        },
      }}
    />
  );
}

async function createPublicToken() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/");
  }

  const { publicToken } = await dub.embedTokens.referrals({
    programId: process.env.DUB_PROGRAM_ID as string,
    partner: {
      tenantId: session.user.id,
      name: session.user.name || "",
      email: session.user.email || "",
      image: session.user.image || "",
    },
  });

  return publicToken;
}
