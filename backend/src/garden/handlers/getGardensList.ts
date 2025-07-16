import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Garden from "../../../src/schemas/gardenSchema";
import { uncodeUserFromToken } from "../../users/uncodeUserFromToken";

export const getGardensList = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const gardens = await Garden.find({ userId: userId });
  const filteredGardensData = gardens.map(({ name, _id }) => ({ name, _id }));
  res.send(filteredGardensData);
};
