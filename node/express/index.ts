import "dotenv/config";
import { dub } from "./dub";
import express, { Request, Response } from "express";

const app = express();

// Create a link
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

// Upsert a link
// Update the link if same URL already exists or create a new link
app.get("/upsert-link", async (req: Request, res: Response) => {
  try {
    const result = await dub.links.upsert({
      url: "https://www.google.com",
      externalId: "my-link-id",
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json(error);
  }
});

// Update a link
app.get("/update-link", async (req: Request, res: Response) => {
  try {
    const result = await dub.links.update("LINK_ID OR EXTERNAL_ID", {
      url: "https://www.google.us",
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json(error);
  }
});

// Retrieve analytics for link
// See the API reference to see all the options available https://dub.co/docs/api-reference/endpoint/retrieve-analytics
app.get("/analytics", async (req: Request, res: Response) => {
  try {
    const result = await dub.analytics.retrieve({
      linkId: "LINK_ID",
      interval: "7d",
      event: "clicks",
      groupBy: "timeseries",
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json(error);
  }
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
