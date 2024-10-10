import express from "express";
import { createUser } from "./createUser";
import { login } from "./login";
import { logout } from "./logout";

export const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", logout);
