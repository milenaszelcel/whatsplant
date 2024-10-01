import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getPlants } from "./plants/getPlantsFromApiAndSaveToDb/getPlants";
import { getListOfPlants } from "./plants/repository";
import * as db from "./db/connect";
import * as plants from "./plants/index";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

db.connect();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Serverdfdf");
});

app.get("/getPlants", async (req: Request, res: Response) => {
  await getPlants();
  res.send("Wyslano");
});

app.use("/plants", plants.router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

process.on("SIGHUP", function () {
  console.log("ZABIJ");
  process.kill(process.pid, "SIGTERM");
});
module.exports = app;
