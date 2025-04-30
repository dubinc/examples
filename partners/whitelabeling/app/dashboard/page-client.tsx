"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ReferralEmbed({ publicToken }: { publicToken: string }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <iframe
      src={`https://app.dub.co/embed/referrals?token=${publicToken}`}
      allow="clipboard-write"
      className="h-screen w-full"
    />
  );

  // return <DubEmbed data="referrals" token={publicToken} />;
}
