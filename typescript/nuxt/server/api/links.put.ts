import { dub } from "../utils/dub";

export default defineEventHandler(async () => {
  try {
    const result = await dub.links.upsert({
      url: "https://www.google.com",
    });

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
});
