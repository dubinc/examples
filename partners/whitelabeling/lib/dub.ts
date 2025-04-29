import { Dub } from "dub";
import { env } from "./env";

export const dub = new Dub({
  token: env.DUB_API_KEY,
});
