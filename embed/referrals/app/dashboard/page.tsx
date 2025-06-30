import { dub } from "@/lib/dub";
import { DubEmbed } from "@dub/embed-react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Popup } from "./popup";
import { SideNav } from "./side-nav";

export default async function Dashboard() {
  const publicToken = await createPublicToken();

  if (!publicToken) {
    return <div>Failed to create public token.</div>;
  }

  return (
    <>
      <div className="w-full mx-auto max-w-screen-lg grid grid-cols-1 p-9 sm:grid-cols-[max-content_minmax(0,1fr)] gap-12">
        <SideNav />
        <div className="bg-background rounded-xl border border-foreground/10">
          <DubEmbed
            data="referrals"
            token={publicToken}
            options={{
              theme: "system",
            }}
          />
        </div>
      </div>
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
