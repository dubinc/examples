# Segment + Next.js – Dub Conversions

This is an example of how to use Dub Conversions to track leads and sales using the [Dub (Actions) Destination](https://segment.com/docs/connections/destinations/catalog/actions-dub/).

## Getting started

1. From your Segment workspace, go to [Dub (Actions)](https://app.segment.com/goto-my-workspace/destinations/catalog/actions-dub) and click **Add Destination**.
2. Select an existing Source to connect to Dub (Actions).
3. Open your [Dub workspace](https://app.dub.co)
4. Go to Settings > [API Keys](https://app.dub.co/settings/tokens) in your workspace and create a new API key.
5. Return to your Segment workspace and enter the **API Key** in the Dub (Actions) destination settings page.

## How it works

```ts
import { Analytics } from "@segment/analytics-node";

const segment = new Analytics({
  writeKey: "<YOUR_SEGMENT_WRITE_KEY>",
});

const cookieStore = await cookies();
const clickId = cookieStore.get("dub_id")?.value;

segment.track({
  userId: id,
  event: "Sign Up",
  context: {
    traits: {
      name,
      email,
      avatar,
      clickId, // You need to update the mapping for the `clickId` field to point to the correct location in the payload.
    },
  },
  integrations: {
    All: true,
  },
});
```

This will track the signup event to Dub. You can do the same for Sale events.
