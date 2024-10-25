import { Request, Response } from "express";
import { Filter, getListOfPlants } from "../repository";

const getPlants = async (req: Request, res: Response) => {
  const { page = 1, perPage = 50, search } = req.query;
  try {
    const plants = await getListOfPlants({ search } as Filter, {
      page: +page!,
      perPage: +perPage!,
    });
    res.send(plants);
  } catch (error) {
    res.status(400);
    res.statusMessage = "";
  }
};

export default getPlants;
