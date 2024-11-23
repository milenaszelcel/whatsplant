import { Request, Response } from "express";
import Garden from "../../schemas/gardenSchema";

export const waterPlant = async (req: Request, res: Response) => {
  if (req.body) {
    const gardenId = req.body.gardenId;

    const waterValue = req.body.waterValue;
    const plantId = req.body.plantId;
    console.log(gardenId);
    console.log(plantId);
    try {
      const result = await Garden.findOneAndUpdate(
        {
          _id: gardenId,
          "plants.plantId": plantId, // Find the garden and plant
        },
        {
          $inc: { "plants.$.waterValue": waterValue },
        },
        { new: true }
      );
      res.send("wyslano");
      console.log("Updated Document:", result);
    } catch (err) {
      console.error("Error updating value:", err);
    }
  }
};
