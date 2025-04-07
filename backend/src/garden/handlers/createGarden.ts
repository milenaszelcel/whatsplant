import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Garden from "../../schemas/gardenSchema";
import { gardenValidationSchema } from "@greenmate/contract/src/schemas/gardenValidationSchema";

export const createGarden = async (req: Request, res: Response) => {
  if (req.cookies.token) {
    const token = req.cookies.token;
    const uncodedCookies = (await jwt.verify(token, "SECRET_KEY")) as {
      userId: string;
    };
    const userId = uncodedCookies.userId;

    const validatedGarden = await gardenValidationSchema.validateAsync({
      name: req.body.name,
      userId: userId,
    });

    const newGarden = await new Garden(validatedGarden);

    newGarden.save();
    res.send("Succesfully added new garden");
  } else {
    res.statusMessage = "Write correct garden's name";
    res.status(400).end();
  }
};
