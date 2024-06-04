import { json } from "@remix-run/node";
import { dub } from "~/dub";

export const loader = async () => {
  try {
    // Update a link by its linkId
    let result = await dub.links.update("clv3o9p9q000au1h0mc7r6l63", {
      url: "https://www.google.uk",
    });

    // Update a link by its externalId
    result = await dub.links.update("ext_12345", {
      url: "https://www.google.uk",
    });

    return json(result, 200);
  } catch (error: any) {
    console.error(error);
    return json(error, 400);
  }
};
