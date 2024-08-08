# OAuth Integration Example

Dub supports OAuth 2.0 authentication, which is _recommended_ if you build integrations extending Dub’s functionality.

This example demonstrates how to authenticate users with Dub OAuth 2.0 flow.

## Getting Started

Follow the steps below to get started:

1. Create a new Integration in the [Dub](https://dub.co) under your workspace
2. Make sure redirect URIs are set to `http://localhost:3000/api/oauth/callback` and optionally, your production URL (e.g. `https://example.com/api/oauth/callback`)
3. Copy the `Client ID` and `Client Secret`
4. Update the `.env` file with the `DUB_CLIENT_ID` and `DUB_CLIENT_SECRET`
5. Run the app
6. Click the **Sign in with Dub** button to start the OAuth flow

## Learn More

To learn more about Dub, take a look at the following resources:

- [Integrate with Dub](https://dub.co/docs/integrations/quickstart)
- [API Reference](https://dub.co/docs/api-reference/introduction)
- [SDKs](https://dub.co/docs/sdks/overview)
