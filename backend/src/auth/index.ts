import express from "express";
import { login } from "./handlers/login";
import { logout } from "./handlers/logout";

export const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
