import express from "express";
import getPlants from "./handlers/getPlants";
import { getPlant } from "./handlers/getPlant";

export const router = express.Router();

router.get("/", getPlants);
router.get("/:id", getPlant);
