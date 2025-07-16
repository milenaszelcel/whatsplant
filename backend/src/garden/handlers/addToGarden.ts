import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Garden from "../../schemas/gardenSchema";

export const addToGarden = async (req: Request, res: Response) => {
  const plantId = req.body.plantId;
  const gardenName = req.body.gardenName;

  if (!plantId) {
    return res.status(400).json({ message: "Plant ID missing." });
  }

  const userId = req.user?.id;
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
