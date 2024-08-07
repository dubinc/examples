"use client";

import { signOut } from "@/lib/actions";
import { User } from "@/lib/session";
import Link from "next/link";
import { BlurImage, Button, Popover } from "@dub/ui";
import SignInWithDub from "./signin-with-dub";
import { DICEBEAR_AVATAR_URL } from "@dub/utils";
import { useState } from "react";
import Image from "next/image";
import { ChevronsUpDown, LogOut } from "lucide-react";

export const NavBar = ({ user }: { user?: User }) => {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className="fixed top-0 flex w-full justify-center border-b border-gray-200 bg-white/50 backdrop-blur-xl z-30 transition-all">
      <div className="mx-5 flex h-16 w-full max-w-screen-lg items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-base flex items-center gap-3 whitespace-nowrap"
        >
          <div className="size-4 rounded-full border-2 border-black" />
          Dub OAuth App
        </Link>

        {user ? (
          <div className="flex items-center gap-6">
            <Popover
              openPopover={openPopover}
              setOpenPopover={setOpenPopover}
              align="end"
              content={
                <div className="flex flex-col w-full sm:w-56 p-2">
                  <div className="p-2">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {user.workspace.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 rounded-md p-2 text-sm transition-colors duration-75 hover:bg-gray-100 active:bg-gray-200"
                    onClick={() => signOut()}
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </button>
                </div>
              }
            >
              <button className="active:bg-gray-200 min-w-4 whitespace-nowrap flex items-center h-12 px-2 gap-2 sm:gap-3 font-medium text-sm rounded-lg hover:bg-gray-100 transition-colors">
                <Image
                  src={
                    user.workspace.logo ||
                    `${DICEBEAR_AVATAR_URL}${user.workspace.name}`
                  }
                  alt={`${user.workspace.name} avatar`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="hidden sm:block">{user.workspace.name}</span>
                <span className="text-gray-300">/</span>
                <span className="truncate">{user.name}</span>
                <ChevronsUpDown className="-ml-1 size-4 text-gray-400 shrink-0" />
              </button>
            </Popover>
          </div>
        ) : (
          <SignInWithDub />
        )}
      </div>
    </div>
  );
};
