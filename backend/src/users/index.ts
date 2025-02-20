import express from "express";
import { createUser } from "./handlers//createUser";

export const router = express.Router();

router.post("/", createUser);
