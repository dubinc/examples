"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DubEmbed } from "@dub/embed-react";

export function PageClient() {
  const router = useRouter();
  const { status } = useSession();
  const [publicToken, setPublicToken] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPublicToken = async () => {
      const response = await fetch("/api/embed-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        alert("Failed to fetch public token.");
        return;
      }

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
