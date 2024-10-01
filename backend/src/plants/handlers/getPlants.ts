import { Request, Response } from "express";
import { Filter, getListOfPlants } from "../repository";

const getPlants = async (req: Request, res: Response) => {
  const { page = 1, perPage = 50, search } = req.query;
  const plants = await getListOfPlants({ search } as Filter, {
    page: +page!,
    perPage: +perPage!,
  });
  res.send(plants);
};

export default getPlants;
