"use client";

import { Button } from "@dub/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInWithDub() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant="primary"
      text="Sign in with Dub"
      className="w-fit"
      loading={isLoading}
      onClick={() => {
        setIsLoading(true);
        router.push("/api/oauth/authorize");
      }}
    />
  );
}
