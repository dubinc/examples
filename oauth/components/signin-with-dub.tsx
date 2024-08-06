"use client";

import { Button, Logo } from "@dub/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInWithDub() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant="primary"
      icon={<Logo className="w-4 h-4 text-white" />}
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
