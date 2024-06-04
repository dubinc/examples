import { json } from "@remix-run/node";
import { dub } from "lib/dub";

export const loader = async () => {
  try {
    const result = await dub.links.create({
      url: "https://www.google.com",
    });

    // A new link has been created
    console.log(result);

    return json(result, 200);
  } catch (error: any) {
    console.error(error);
    return json(error, 400);
  }
};
