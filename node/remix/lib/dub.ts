import { Dub } from "dub";

export const dub = new Dub({
  token: process.env.DUB_API_KEY,
  workspaceId: process.env.DUB_WORKSPACE_ID,
});
