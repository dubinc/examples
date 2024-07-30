import { OAuth2Client } from "@badgateway/oauth2-client";

export const oauth2Client = new OAuth2Client({
  clientId: `${process.env.DUB_CLIENT_ID}`,
  clientSecret: `${process.env.DUB_CLIENT_SECRET}`,
  authorizationEndpoint: "https://app.dub.co/oauth/authorize",
  tokenEndpoint: "https://api.dub.co/oauth/token",
});
