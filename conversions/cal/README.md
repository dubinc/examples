# Cal.com + Dub Conversion Tracking Demo

This is an example of how to track meeting bookings on Cal.com as [lead conversion events on Dub](https://dub.co/docs/conversions/leads/introduction).

Useful for tracking SaaS enterprise leads or agency meeting bookings.

## Installation steps:

1. Install the [Dub app from the Cal.com App Store](https://app.cal.com/apps/dub).
2. Set up the [`@dub/analytics` client-side script](https://dub.co/docs/sdks/client-side/introduction) on your site, and add both `app.cal.com` and `cal.com` to your [outbound domains](https://dub.co/docs/sdks/client-side/features/cross-domain-tracking).
3. Once a booking event occurs, the booker's details will automatically be tracked as a [lead event](https://dub.co/docs/conversions/leads/introduction) on Dub.

> [!TIP]
> Lead conversion events from Cal.com might take up to a minute to be recorded on Dub.

## Video Demo

Here's a ~50 second video of the end-to-end installation flow + demo of how the Cal.com integration works:

https://github.com/user-attachments/assets/a5a8e94d-5579-4f81-8d56-1e4f3fc5bd15
