import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.send("Logged out");
  res.end();
};
