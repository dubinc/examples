"use client";

import { Button } from "@dub/ui";
import { useRouter } from "next/navigation";

export default function SignInWithDub() {
  const router = useRouter();

  return (
    <Button
      variant="primary"
      text="Sign in with Dub"
      className="w-30 h-10 rounded"
      onClick={() => router.push("/api/oauth/authorize")}
    />
  );
}
