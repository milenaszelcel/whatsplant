import express from "express";
import { addToGarden } from "./addToGarden";
import { createGarden } from "./createGarden";
import { getGardensList } from "./getGardensList";
import { getGarden } from "./getGarden";

export const router = express.Router();

router.post("/createGarden", createGarden);

router.post("/addToGarden", addToGarden);

router.get("/getGardensList", getGardensList);

router.get("/getGarden", getGarden);
