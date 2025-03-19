import "express";
import User from "../schemas/userSchema";
import type { UserInfo } from "./UserInfo";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
    }
  }
}
