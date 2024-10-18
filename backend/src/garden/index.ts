import express from "express";
import { addToGarden } from "./addToGarden";
import { createGarden } from "./createGarden";

export const router = express.Router();

router.post("/createGarden", createGarden);
router.post("/addToGarden", addToGarden);
