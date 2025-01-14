"use server";

import { z } from "zod";
import { actionClient } from "./safe-action";
import { setConfig } from "../config";

const configSchema = z.object({
  DUB_API_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
  STRIPE_PRICE_ID: z.string(),
});

export const updateConfigAction = actionClient
  .schema(configSchema)
  .action(async ({ parsedInput }) => {
    setConfig({ ...parsedInput });
    // fake a delay
    await new Promise((resolve) => setTimeout(resolve, 250));
    return { ok: true };
  });
