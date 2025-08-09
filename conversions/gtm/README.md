# Google Tag Manager + Next.js – Dub Conversions

This is an example of how to use Dub Conversions to track leads and sales using Google Tag Manager (GTM) with the Dub GTM template.

## Prerequisites

- [Install](https://dub.co/docs/sdks/client-side/installation-guides/google-tag-manager) `@dub/analytics` client-side script
- [Configure lead tracking](https://dub.co/docs/conversions/leads/google-tag-manager) in GTM
- [Configure sale tracking](https://dub.co/docs/conversions/sales/google-tag-manager) in GTM

## How it works

This example uses Next.js with `@next/third-parties/google` to integrate Google Tag Manager:

```tsx
import { GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-TFXVTRHD" />
      <body>{children}</body>
    </html>
  );
}
```

Then, track events using the `sendGTMEvent` function:

```tsx
import { sendGTMEvent } from "@next/third-parties/google";

// Track a lead (Sign Up)
sendGTMEvent({
  event: "Sign Up",
  customerExternalId: "3SDNAC0C2",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerAvatar: "https://example.com/avatar.jpg",
});

// Track a sale (Purchase)
sendGTMEvent({
  event: "Purchase",
  customerExternalId: "3SDNAC0C2",
  amount: 1000, // in cents
});
```
