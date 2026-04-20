# HubSpot + Dub Conversion Tracking Demo

This is an example of how to track [HubSpot](https://www.hubspot.com/) form submissions and meeting bookings as [lead conversion events on Dub](https://dub.co/docs/conversions/leads/introduction).

Useful for tracking SaaS signups, contact-us form submissions, and sales meeting bookings back to the referral link that drove them.

## Files

| File                             | Description                                                                                                                                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`index.html`](./index.html)     | Embeds a **HubSpot Form** on the page. When the form is ready, the `dub_id` click ID is read from the cookie set by `@dub/analytics` and written into a hidden form field so HubSpot forwards it to Dub on submission. |
| [`meeting.html`](./meeting.html) | Embeds the **HubSpot Meetings (scheduler) widget**. It listens for the `meetingBookSucceeded` `postMessage` from the iframe and then calls `dubAnalytics.trackLead()` with the booked contact's details.               |

## How it works

Both flows rely on the [`@dub/analytics` client-side script](https://dub.co/docs/sdks/client-side/introduction) setting a `dub_id` cookie when a visitor lands on your site via a Dub referral link.

- **Forms flow (`index.html`)**: listens for HubSpot's `hs-form-event:on-ready` event and populates a hidden field (with property name `dub_id`) on the form. Dub's HubSpot integration picks up the click ID from the submission and attributes it as a lead.
- **Meetings flow (`meeting.html`)**: listens to `window` messages from `https://meetings.hubspot.com`, and when a meeting is successfully booked, calls `dubAnalytics.trackLead()` with the contact's name and email in `deferred` mode.

## Changes needed to make it dynamic

The files contain hardcoded IDs/domains for the demo. Replace the following before using them in your own project:

### `index.html`

1. **HubSpot portal ID** – update the script src and `data-portal-id` with your own portal ID:
   ```html
   <script
     src="https://js.hsforms.net/forms/embed/<YOUR_PORTAL_ID>.js"
     defer
   ></script>
   ... data-portal-id="<YOUR_PORTAL_ID>"</YOUR_PORTAL_ID>
   ```
2. **HubSpot form ID** – replace `data-form-id` with the ID of the form you created in HubSpot:
   ```html
   data-form-id="<YOUR_FORM_ID>"</YOUR_FORM_ID>
   ```
3. **Hidden `dub_id` field** – create a hidden field on your HubSpot form whose internal property name is `dub_id`, then update the `setFieldValue` call to match its object/property path (e.g. `0-1/dub_id`, `0-2/dub_id`, …):
   ```js
   HubSpotFormsV4.getForms()[0].setFieldValue(
     "<OBJECT_TYPE_ID>/dub_id",
     clickId
   );
   ```
4. **Dub analytics `data-domains`** – replace `acme.link` with your own short link domain configured in Dub:
   ```html
   data-domains='{"refer":"<YOUR_DUB_DOMAIN>"}'</YOUR_DUB_DOMAIN>
   ```

### `meeting.html`

1. **Dub publishable key** – replace the placeholder with your workspace's publishable key from [Dub → Settings → API Keys](https://app.dub.co/settings/tokens):
   ```js
   s.setAttribute("data-publishable-key", "<YOUR_DUB_PUBLISHABLE_KEY>");
   ```
2. **Dub analytics `data-domains`** – replace `dub.sh` with your own short link domain:
   ```js
   s.setAttribute("data-domains", '{"refer":"<YOUR_DUB_DOMAIN>"}');
   ```
3. **Remove `data-api-host`** – this line points to a local Dub instance and should be removed in production so the script talks to Dub's hosted API:
   ```js
   s.setAttribute("data-api-host", "http://localhost:8888/api"); // remove this in production
   ```
4. **HubSpot meeting link** – replace the scheduler slug with your own meeting link:
   ```html
   <div
     class="meetings-iframe-container"
     data-src="https://meetings.hubspot.com/<YOUR_MEETING_SLUG>?embed=true"
   ></div>
   ```

## Learn more

- [Dub Conversions – Leads](https://dub.co/docs/conversions/leads/introduction)
- [`@dub/analytics` client-side SDK](https://dub.co/docs/sdks/client-side/introduction)
- [HubSpot Forms embed](https://developers.hubspot.com/docs/cms/building-blocks/forms)
- [HubSpot Meetings embed](https://knowledge.hubspot.com/meetings-tool/embed-the-meetings-tool-on-an-external-page)
