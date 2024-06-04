import { dub } from "../utils/dub";

export default defineEventHandler(async () => {
  try {
    const result = await dub.links.create({
      url: "https://www.google.com",
    });

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
});
