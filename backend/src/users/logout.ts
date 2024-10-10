import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  res.clearCookie("cookie");
  res.send("Logged out");
  res.end();
};
