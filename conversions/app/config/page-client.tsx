"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateConfigAction } from "@/lib/actions/update-config";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Config } from "@/lib/config";

export default function ConfigPageClient({ config }: { config: Config }) {
  const { execute, isExecuting } = useAction(updateConfigAction, {
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Config saved!");
    },
  });

  const [data, setData] = useState({
    DUB_API_KEY: config.DUB_API_KEY || "",
    STRIPE_SECRET_KEY: config.STRIPE_SECRET_KEY || "",
    STRIPE_PUBLISHABLE_KEY: config.STRIPE_PUBLISHABLE_KEY || "",
    STRIPE_PRICE_ID: config.STRIPE_PRICE_ID || "",
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
            htmlFor="DUB_API_KEY"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            DUB_API_KEY
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="DUB_API_KEY"
            className="mt-2"
            required
            placeholder=""
            onChange={(e) => setData({ ...data, DUB_API_KEY: e.target.value })}
            value={data.DUB_API_KEY}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="STRIPE_SECRET_KEY"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            STRIPE_SECRET_KEY
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="STRIPE_SECRET_KEY"
            className="mt-2"
            required
            placeholder=""
            onChange={(e) =>
              setData({ ...data, STRIPE_SECRET_KEY: e.target.value })
            }
            value={data.STRIPE_SECRET_KEY}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="STRIPE_PUBLISHABLE_KEY"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            STRIPE_PUBLISHABLE_KEY
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="STRIPE_PUBLISHABLE_KEY"
            className="mt-2"
            required
            placeholder=""
            onChange={(e) =>
              setData({ ...data, STRIPE_PUBLISHABLE_KEY: e.target.value })
            }
            value={data.STRIPE_PUBLISHABLE_KEY}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="STRIPE_PRICE_ID"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            STRIPE_PRICE_ID
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="STRIPE_PRICE_ID"
            className="mt-2"
            required
            placeholder=""
            onChange={(e) =>
              setData({ ...data, STRIPE_PRICE_ID: e.target.value })
            }
            value={data.STRIPE_PRICE_ID}
          />
        </div>

        <Button disabled={isExecuting} className="!w-full">
          {isExecuting && <ReloadIcon className="mr-2 size-4 animate-spin" />}
          Save changes
        </Button>
      </form>
    </main>
  );
}
