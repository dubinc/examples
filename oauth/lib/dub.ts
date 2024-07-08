import { Dub } from "dub";

export const dubClient = (accessToken: string) => {
  return new Dub({
    token: accessToken,
    serverURL: process.env.DUB_API_URL || "https://api.dub.co",
  });
};
