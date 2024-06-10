import { json } from "@remix-run/node";
import { dub } from "~/dub";

export const loader = async () => {
  try {
    const result = await dub.links.create({
      url: "https://www.google.com",
      externalId: "12345", // Optional
    });

    return json(result, 200);
  } catch (error: any) {
    console.error(error);
    return json(error, 400);
  }
};
