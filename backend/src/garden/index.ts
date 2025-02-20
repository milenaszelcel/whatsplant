import express from "express";
import { addToGarden } from "./handlers/addToGarden";
import { createGarden } from "./handlers/createGarden";
import { getGardensList } from "./handlers/getGardensList";
import { getGarden } from "./handlers/getGarden";
import { removeGarden } from "./handlers/removeGarden";
import { waterPlant } from "./handlers/waterPlant";

export const router = express.Router();

router.post("/", createGarden);

router.get("/", getGardensList);

router.delete("/", removeGarden);

router.get("/:id", getGarden);

router.post("/:gardenId/plants/:plantId", addToGarden);

router.post("/:gardenId/plants", waterPlant);
