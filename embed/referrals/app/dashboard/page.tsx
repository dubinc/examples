import { dub } from "@/lib/dub";
import { DubEmbed } from "@dub/embed-react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { PopupClient } from "./popup";
import { Suspense } from "react";

export default async function Dashboard() {
  const publicToken = await createPublicToken();

  if (!publicToken) {
    return <div>Failed to create public token.</div>;
  }

  return (
    <>
      <DubEmbed
        data="referrals"
        token={publicToken}
        options={{
          theme: "system",
        }}
      />
      <Suspense fallback={null}>
        <Popup />
      </Suspense>
    </>
  );
}

async function createPublicToken() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/");
  }

  const { publicToken } = await dub.embedTokens.referrals({
    partner: {
      tenantId: session.user.id,
      name: session.user.name || "",
      email: session.user.email || "",
      image: session.user.image || "",
    },
  });

  return publicToken;
}

async function Popup() {
  const cookieStore = await cookies();
  const dubId = cookieStore.get("dub_id")?.value;

  if (!dubId) {
    return null;
  }

  return <PopupClient />;
}
