import "express";
import { UserInfo } from "./src/types/UserInfo";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
    }
  }
}
