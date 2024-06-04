import { dub } from "../utils/dub";

export default defineEventHandler(async () => {
  try {
    const result = await dub.links.update("LINK_ID OR EXTERNAL_ID", {
      url: "https://www.google.us",
    });

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
});
