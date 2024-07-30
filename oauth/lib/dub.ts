import { Dub } from "dub";

export const dubClient = (accessToken: string) => {
  return new Dub({
    token: accessToken,
  });
};
