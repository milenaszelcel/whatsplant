import type { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  res.send("Logged out");
  res.end();
};
