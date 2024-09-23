import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const db = require("./db/connect");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

db.connect(app);

require("./routes")(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Serverdfdf");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
