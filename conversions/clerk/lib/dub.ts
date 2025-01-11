import { Dub } from "dub";

const dub = new Dub({
  token: process.env.DUB_API_KEY,
});

export { dub };
