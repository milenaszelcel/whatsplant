import express from "express";
import { login } from "./handlers/login";
import { logout } from "./handlers/logout";
import { refreshTokens } from "./tokenService/refreshTokens";

export const router = express.Router();

router.post("/refresh", refreshTokens);
router.post("/login", login);
router.post("/logout", logout);
