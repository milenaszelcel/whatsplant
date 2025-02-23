import type { Request, Response } from "express";
import { uncodeUserFromToken } from "../../users/uncodeUserFromToken";

export const removeGarden = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const userId = await uncodeUserFromToken(token);
};
