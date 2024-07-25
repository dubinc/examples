import { Dub } from "dub";

export const DUB_URL = process.env.DUB_URL || "https://app.dub.co";
export const DUB_API_URL = process.env.DUB_API_URL || "https://api.dub.co";

export const dubClient = (accessToken: string) => {
  return new Dub({
    token: accessToken,
    serverURL: DUB_API_URL,
  });
};
