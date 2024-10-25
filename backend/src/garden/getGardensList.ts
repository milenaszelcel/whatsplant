import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Garden from "../../src/schemas/gardenSchema";
import { uncodeUserFromToken } from "../users/uncodeUserFromToken";

export const getGardensList = async (req: Request, res: Response) => {
  if (req.cookies.token) {
    const token = req.cookies.token;
    const userId = await uncodeUserFromToken(token);

    const gardens = await Garden.find({ userId: userId });
    const filteredGardensData = gardens.map(({ name, _id }) => ({ name, _id }));
    res.send(filteredGardensData);
  } else {
    res.statusMessage = "authorization error";
    res.status(401).end();
  }
};
