# OAuth Integration Example

Dub supports [OAuth 2.0 authentication](https://dub.co/docs/integrations/quickstart), which is **_recommended_** if you build integrations extending Dub’s functionality.

This example demonstrates how to authenticate users with Dub OAuth 2.0 flow.

Live demo: https://oauth.dub.sh

## Getting Started

Follow the steps below to get started:

1. Create a new Integration in your [Dub workspace](https://app.dub.co/settings/oauth-apps).
2. Fill in all the appropriate fields.
3. Make sure to set your redirect URIs:
   1. Local development: `http://localhost:3000/api/oauth/callback`
   2. Production: `https://yourdomain.com/api/oauth/callback`
4. Copy the `Client ID` and `Client Secret` values and paste them into the `.env` file as `DUB_CLIENT_ID` and `DUB_CLIENT_SECRET` respectively.
5. Install the dependencies and start the app.
6. Click the **Sign in with Dub** button to initiate the OAuth flow.

## Learn More

To learn more about Dub's OAuth flow, take a look at the following resources:

- [Integrate with Dub](https://dub.co/docs/integrations/quickstart)
- [API Reference](https://dub.co/docs/api-reference/introduction)
- [SDKs](https://dub.co/docs/sdks/overview)
