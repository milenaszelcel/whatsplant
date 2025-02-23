import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Garden from "../../schemas/gardenSchema";

export const addToGarden = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const plantId = req.body.plantId;
  const gardenName = req.body.gardenName;

  if (!token || !plantId) {
    return res.status(400).json({ message: "Token or plant ID missing." });
  }
  const uncodedCookies = (await jwt.verify(token, "SECRET_KEY")) as {
    userId: string;
  };

  const userId = uncodedCookies.userId;
  try {
    const updatedGarden = await Garden.findOneAndUpdate(
      { userId: userId, name: gardenName },
      { $push: { plants: { plantId: plantId } } },
      { new: true }
    );
    if (!updatedGarden) {
      console.log("Garden not found.");
    }
  } catch (error) {
    console.error("Error adding plant to garden:", error);
  }
};
