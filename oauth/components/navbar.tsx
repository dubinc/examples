"use client";

import { signOut } from "@/lib/actions";
import { User } from "@/lib/session";
import Link from "next/link";

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
            <button
              className="bg-black text-white py-2 px-4 rounded"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            className="bg-black text-white py-2 px-4 rounded"
            href="/api/oauth/authorize"
            prefetch={false}
          >
            Sign in with Dub
          </Link>
        )}
      </div>
    </div>
  );
};
