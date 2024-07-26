"use client";

import { signOut } from "@/lib/actions";
import { User } from "@/lib/session";
import Link from "next/link";
import { Button } from "@dub/ui";
import SignInWithDub from "./signin-with-dub";

export const NavBar = ({ user }: { user?: User }) => {
  return (
    <div className="fixed top-0 flex w-full justify-center border-b border-gray-200 bg-white/50 backdrop-blur-xl z-30 transition-all">
      <div className="mx-5 flex h-16 w-full max-w-screen-md items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Dub OAuth App
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="text-black font-bold">{user.name}</div>
            <Button
              variant="outline"
              text="Sign out"
              className="w-30 h-10 rounded"
              onClick={() => signOut()}
            />
          </div>
        ) : (
          <SignInWithDub />
        )}
      </div>
    </div>
  );
};
