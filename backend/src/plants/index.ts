import express from "express";
import getPlants from "./handlers/getPlants";

export const router = express.Router();

router.get("/", getPlants);
