import { json } from "@remix-run/node";
import { dub } from "~/dub";

export const loader = async () => {
  try {
    const result = await dub.links.upsert({
      url: "https://www.google.com",
      externalId: "my-link-id",
    });

    return json(result, 200);
  } catch (error: any) {
    console.error(error);
    return json(error, 400);
  }
};
