"use client";

import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { signUpUser } from "@/lib/actions/signup";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Session } from "@/lib/session";

export default function LoginPageClient({ session }: { session: Session }) {
  const { execute, isExecuting } = useAction(signUpUser, {
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      toast.success("User signed up successfully!");
    },
  });

  const [data, setData] = useState({
    name: session?.name || "David",
    email: session?.email || "david@example.com",
    password: session?.password || "super-secret-password",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form
        className="grid max-w-screen-sm w-full gap-6 p-8 border border-tremor-border rounded-xl"
        onSubmit={(e) => {
          e.preventDefault();
          execute(data);
        }}
      >
        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="name"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Name
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="name"
            className="mt-2"
            required
            placeholder=""
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="email"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Email
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="email"
            className="mt-2"
            required
            placeholder=""
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="password"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Password
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="password"
            name="password"
            className="mt-2"
            required
            placeholder=""
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
          />
        </div>

        <Button disabled={isExecuting}>
          {isExecuting && <ReloadIcon className="mr-2 size-4 animate-spin" />}
          Signup
        </Button>
      </form>
    </main>
  );
}
