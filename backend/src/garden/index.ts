import express from "express";
import { addToGarden } from "./handlers/addToGarden";
import { createGarden } from "./handlers/createGarden";
import { getGardensList } from "./handlers/getGardensList";
import { getGarden } from "./handlers/getGarden";
import { removeGarden } from "./handlers/removeGarden";
import { waterPlant } from "./watering/waterPlant";

export const router = express.Router();

router.post("/createGarden", createGarden);

router.post("/addToGarden", addToGarden);

router.get("/getGardensList", getGardensList);

router.get("removeGarden", removeGarden);

router.get("/getGarden", getGarden);

router.post("/waterPlant", waterPlant);
