"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DubEmbed } from "@dub/embed-react";

export function PageClient() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [publicToken, setPublicToken] = useState("");

  console.log("session", session);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPublicToken = async () => {
      const response = await fetch("/api/embed-token"); // TODO: add this endpoint
      const data = await response.json();

      setPublicToken(data.publicToken);
    };

    fetchPublicToken();
  }, []);

  if (!publicToken) {
    return <div>Loading...</div>;
  }

  return <DubEmbed data="referrals" token={publicToken} />;
}
