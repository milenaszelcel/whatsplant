import type { Request, Response } from "express";
import Plant from "../../schemas/plantSchema";

export const getPlant = async (req: Request, res: Response) => {
  const plantId = req.query.plantId;

  const plant = await Plant.findOne({ id: plantId });
  console.log(plant);
};
