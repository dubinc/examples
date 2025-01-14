import { Dub } from "dub";
import { getConfig } from "./config";

export const getDub = () => {
  const config = getConfig();

  if (!config.DUB_API_KEY) {
    throw new Error("Dub API key not found in cookies");
  }
  return new Dub({ token: config.DUB_API_KEY });
};
