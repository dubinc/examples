import { OAuth2Client } from "@badgateway/oauth2-client";

const DUB_URL = process.env.DUB_URL || "https://app.dub.co";
const DUB_API_URL = process.env.DUB_API_URL || "https://api.dub.co";

export const oauth2Client = new OAuth2Client({
  clientId: `${process.env.DUB_CLIENT_ID}`,
  clientSecret: `${process.env.DUB_CLIENT_SECRET}`,
  authorizationEndpoint: `${DUB_URL}/oauth/authorize`,
  tokenEndpoint: `${DUB_API_URL}/oauth/token`,
});
