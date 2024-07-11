import { OAuth2Client } from "@badgateway/oauth2-client";

export const oauth2Client = new OAuth2Client({
  clientId: `${process.env.NEXT_PUBLIC_DUB_CLIENT_ID}`,
  clientSecret: `${process.env.DUB_CLIENT_SECRET}`,
  authorizationEndpoint: "http://localhost:8888/oauth/authorize",
  tokenEndpoint: "http://localhost:8888/api/oauth/token",
});
