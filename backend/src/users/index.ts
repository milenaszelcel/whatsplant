import express from "express";
import { createUser } from "./handlers//createUser";
import { login } from "./handlers//login";
import { logout } from "./handlers/logout";

export const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", logout);
