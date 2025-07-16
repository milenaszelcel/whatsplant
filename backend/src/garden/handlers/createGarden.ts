import type { Request, Response } from "express";
import Garden from "../../schemas/gardenSchema";
import { gardenValidationSchema } from "@greenmate/contract/src/schemas/gardenValidationSchema";
import type { PlantWithAmount } from "@greenmate/contract";

export const createGarden = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const plantsWithAmount = <PlantWithAmount[]>req.body.plantsWithAmount;

  const expandedPlantList = plantsWithAmount.flatMap((plantWithAmount) =>
    Array(plantWithAmount.amount).fill({ plantId: plantWithAmount.plant.id })
  );

  const validatedGarden = await gardenValidationSchema.validateAsync({
    name: req.body.name,
    type: req.body.type,
    userId: userId,
    plants: expandedPlantList,
  });

  const newGarden = await new Garden(validatedGarden);

  newGarden.save();
  res.send("Succesfully added new garden");
};
