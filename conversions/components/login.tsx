"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { signUpUser } from "@/lib/actions/signup";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Session } from "@/lib/session";

export default function LoginClient({ session }: { session: Session }) {
  const { executeAsync, isExecuting } = useAction(signUpUser, {
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(error.serverError);
      } else {
        toast.error("Something went wrong");
      }
    },
    onSuccess: () => {
      toast.success("User signed up successfully!");
    },
  });

  const [data, setData] = useState({
    name: session?.name || "",
    email: session?.email || "",
    password: session?.password || "",
  });

  return (
    <form
      className="grid gap-6 px-px py-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await executeAsync(data);
      }}
    >
      <div className="col-span-full sm:col-span-3">
        <label htmlFor="name" className="text-foreground font-medium">
          Name
          <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          name="name"
          className="mt-2"
          required
          placeholder="Brendon Urie"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          value={data.name}
        />
      </div>

      <div className="col-span-full sm:col-span-3">
        <label htmlFor="email" className="text-foreground font-medium">
          Email
          <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          name="email"
          className="mt-2"
          required
          placeholder="panic@thedis.co"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
        />
      </div>

      <div className="col-span-full sm:col-span-3">
        <label htmlFor="password" className="text-foreground font-medium">
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
  );
}
