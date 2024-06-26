import "dotenv/config";
import { dub } from "./dub";
import express, { Request, Response } from "express";
import { ClicksTimeseries } from "dub/models/components";

const app = express();

// Create a link
app.get("/create-link", async (req: Request, res: Response) => {
  try {
    const result = await dub.links.create({
      url: "https://www.google.com",
      externalId: "12345", // Optional
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
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json(error);
  }
});

// Update a link
app.get("/update-link", async (req: Request, res: Response) => {
  try {
    // Update a link by its linkId
    let result = await dub.links.update("clv3o9p9q000au1h0mc7r6l63", {
      url: "https://www.google.uk",
    });

    // Update a link by its externalId
    result = await dub.links.update("ext_12345", {
      url: "https://www.google.uk",
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json(error);
  }
});

// Retrieve the timeseries analytics for the last 7 days for a link
app.get("/analytics", async (req: Request, res: Response) => {
  try {
    const result = await dub.analytics.retrieve({
      linkId: "clv3o9p9q000au1h0mc7r6l63",
      interval: "7d",
      event: "clicks",
      groupBy: "timeseries",
    });

    const timeseries = result as ClicksTimeseries[];

    res.status(200).json(timeseries);
  } catch (error: any) {
    res.status(400).json(error);
  }
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
