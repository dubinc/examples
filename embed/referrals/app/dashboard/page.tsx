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
      <div className="w-full mx-auto max-w-screen-lg p-2 sm:p-9">
        <div className="mb-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-200 text-sm">
          <strong>Disclaimer:</strong> This is a demo application. Data is wiped
          every hour.{" "}
          <a
            href="https://dub.co/docs/partners/embedded-referrals"
            target="_blank"
            className="underline font-medium underline-offset-2 decoration-dotted"
          >
            Read the docs ↗
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[max-content_minmax(0,1fr)] gap-12">
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
      groupId: "grp_1K3T275JN4PW5ZJQD141DDSDA",
    },
  });

  return publicToken;
}
