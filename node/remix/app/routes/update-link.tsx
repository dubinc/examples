import { json } from "@remix-run/node";
import { dub } from "~/dub";

export const loader = async () => {
  try {
    const result = await dub.links.update("LINK_ID", {
      url: "https://www.google.us",
    });

    return json(result, 200);
  } catch (error: any) {
    console.error(error);
    return json(error, 400);
  }
};
