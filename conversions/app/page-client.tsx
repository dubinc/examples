"use client";

import { TextInput, Button } from "@tremor/react";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { signUpUser } from "@/lib/actions/signup";

export default function LoginPageClient() {
  const signUpUserAction = useAction(signUpUser, {
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      alert("User signed up successfully!");
    },
  });

  const [data, setData] = useState({
    name: "David",
    email: "david@example.com",
    password: "super-secret-password",
  });

  return (
    <main className="flex min-h-screen flex-col p-24">
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          signUpUserAction.execute(data);
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
          <TextInput
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
          <TextInput
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
          <TextInput
            type="password"
            name="password"
            className="mt-2"
            required
            placeholder=""
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
          />
        </div>

        <Button variant="primary" loading={signUpUserAction.isExecuting}>
          Signup
        </Button>
      </form>
    </main>
  );
}
