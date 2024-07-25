import { OAuth2Client } from "@badgateway/oauth2-client";
import { DUB_API_URL, DUB_URL } from "./dub";

export const oauth2Client = new OAuth2Client({
  clientId: `${process.env.DUB_CLIENT_ID}`,
  clientSecret: `${process.env.DUB_CLIENT_SECRET}`,
  authorizationEndpoint: `${DUB_URL}/oauth/authorize`,
  tokenEndpoint: `${DUB_API_URL}/oauth/token`,
});
