import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { getPlants } from "./plants/getPlantsFromApiAndSaveToDb/getPlants";
import * as db from "./db/connect";
import * as plants from "./plants/index";
import * as users from "./users/index";
import * as garden from "./garden/index";
import * as auth from "./auth/index";
import cors from "cors";
import cookieParser from "cookie-parser";
import { refreshTokens } from "./tokenService/refreshTokens";
import { ensureValidAuthToken } from "./tokenService/ensureValidAuthToken";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

db.connect();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/users", users.router);

app.use("/auth", auth.router);

app.use(ensureValidAuthToken);

app.use("/plants", plants.router);

app.use("/garden", garden.router);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Serverdfdf");
});

app.get("/getPlants", async (req: Request, res: Response) => {
  await getPlants();
  res.send("Wyslano");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
process.on("SIGHUP", function () {
  console.log("ZABIJ");
  process.kill(process.pid, "SIGTERM");
});

module.exports = app;
