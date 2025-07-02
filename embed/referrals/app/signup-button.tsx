"use client";

import { signIn } from "@/lib/auth-client";

export function SignupButton() {
  return (
    <button
      onClick={() =>
        signIn.social({ provider: "github", callbackURL: "/dashboard" })
      }
      className="w-full flex items-center cursor-pointer justify-center gap-3 px-4 h-10 text-sm font-medium text-background bg-foreground hover:bg-foreground/85 rounded-lg transition-colors duration-200"
    >
      Continue with GitHub
    </button>
  );
}
