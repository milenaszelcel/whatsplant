import type { Request, Response } from "express";
import { uncodeUserFromToken } from "../../users/uncodeUserFromToken";
import Garden from "../../schemas/gardenSchema";
import Plant from "../../schemas/plantSchema";

export const getGarden = async (req: Request, res: Response) => {
  if (req.cookies.token) {
    const token = req.cookies.token;
    const _id = req.query.id;
    const userId = await uncodeUserFromToken(token);

    const garden = await Garden.findOne({ userId: userId, _id: _id }).lean();
    if (!garden) {
      return res.status(404).send({ message: "Garden not found" });
    }
    const plants = garden.plants;
    const plantsObjects = await Promise.all(
      plants.map(async (plant) => {
        const plantObject = await Plant.findOne({
          id: plant.plantId,
        });
        return plantObject;
      })
    );

    const gardenWithPlants = {
      name: garden?.name,
      plants: plantsObjects,
    };
    res.send(gardenWithPlants);
  } else {
    res.statusMessage = "authorization error";
    res.status(401).end();
  }
};
