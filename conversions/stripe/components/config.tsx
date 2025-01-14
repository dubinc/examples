"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateConfigAction } from "@/lib/actions/update-config";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Config } from "@/lib/config";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useRouter } from "next/navigation";

export default function ConfigClient({ config }: { config: Config }) {
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(updateConfigAction, {
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(error.serverError);
      } else {
        toast.error("Something went wrong");
      }
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
    <form
      className="grid gap-6 px-px py-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await executeAsync(data);
        router.push("/?step=login");
      }}
    >
      <div className="col-span-full sm:col-span-3">
        <label
          htmlFor="DUB_API_KEY"
          className="text-foreground font-medium flex items-center gap-x-1"
        >
          DUB_API_KEY
          <Tooltip>
            <TooltipTrigger>
              <InfoCircledIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <a
                href="https://dub.co/docs/api-reference/tokens"
                target="_blank"
              >
                Learn how to get your Dub API key ↗
              </a>
            </TooltipContent>
          </Tooltip>
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
          className="text-foreground font-medium flex items-center gap-x-1"
        >
          STRIPE_SECRET_KEY
          <Tooltip>
            <TooltipTrigger>
              <InfoCircledIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <a
                href="https://dashboard.stripe.com/test/apikeys"
                target="_blank"
              >
                Get your Stripe test mode Secret Key ↗
              </a>
            </TooltipContent>
          </Tooltip>
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
          className="text-foreground font-medium flex items-center gap-x-1"
        >
          STRIPE_PUBLISHABLE_KEY
          <Tooltip>
            <TooltipTrigger>
              <InfoCircledIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <a
                href="https://dashboard.stripe.com/test/apikeys"
                target="_blank"
              >
                Get your Stripe test mode Publishable Key ↗
              </a>
            </TooltipContent>
          </Tooltip>
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
          className="text-foreground font-medium flex items-center gap-x-1"
        >
          STRIPE_PRICE_ID
          <Tooltip>
            <TooltipTrigger>
              <InfoCircledIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <a
                href="https://dashboard.stripe.com/test/products"
                target="_blank"
              >
                Create a product in test mode and get the Price ID ↗
              </a>
            </TooltipContent>
          </Tooltip>
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
  );
}
