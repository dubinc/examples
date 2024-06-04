import "dotenv/config";
import { dub } from "./dub";
import express, { Request, Response } from "express";

const app = express();

app.get("/create-link", async (req: Request, res: Response) => {
  try {
    const result = await dub.links.create({
      url: "https://www.google.com",
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json(error);
  }
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
