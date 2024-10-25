import { Request, Response } from "express";
import { uncodeUserFromToken } from "../users/uncodeUserFromToken";
import Garden from "../schemas/gardenSchema";
import Plant from "../schemas/plantSchema";

export const getGarden = async (req: Request, res: Response) => {
  if (req.cookies.token) {
    const token = req.cookies.token;
    const _id = req.query.id;
    const userId = await uncodeUserFromToken(token);

    const garden = await Garden.findOne({ userId: userId, _id: _id });
    console.log(garden);
    const plantsId = garden?.plantsId;
    const plants = await Plant.find({ id: { $in: plantsId } });
    const gardenWithPlants = {
      name: garden?.name,
      plants: plants,
    };

    res.send(gardenWithPlants);
  } else {
    res.statusMessage = "authorization error";
    res.status(401).end();
  }
};
