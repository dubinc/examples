"use client";

import { TextInput, Button } from "@tremor/react";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateConfigAction } from "@/lib/actions/update-config";

export default function ConfigPageClient({ config }: { config: any }) {
  const updateConfig = useAction(updateConfigAction, {
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      alert("Stripe config saved!");
    },
  });

  const [data, setData] = useState({
    STRIPE_SECRET_KEY: config.STRIPE_SECRET_KEY || "",
    STRIPE_PUBLISHABLE_KEY: config.STRIPE_PUBLISHABLE_KEY || "",
    STRIPE_PRICE_ID: config.STRIPE_PRICE_ID || "",
  });

  return (
    <main className="flex min-h-screen flex-col p-24">
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          updateConfig.execute(data);
        }}
      >
        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="STRIPE_SECRET_KEY"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            STRIPE_SECRET_KEY
            <span className="text-red-500">*</span>
          </label>
          <TextInput
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
          <TextInput
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
          <TextInput
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

        <Button variant="primary">Save Changes</Button>
      </form>
    </main>
  );
}
