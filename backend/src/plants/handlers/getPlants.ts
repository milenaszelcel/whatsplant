import type { Request, Response } from "express";
import { type Filter, getListOfPlants } from "../repository";
import { getGardens } from "../../garden/getGardens";

const perPage = Number(process.env.ITEMS_PER_PAGE) || 100;

async function getPlants(req: Request, res: Response) {
  const { page = 1, perPage = 100, search } = req.query;

  try {
    const { plants, total } = await getListOfPlants({ search } as Filter, {
      page: +page!,
      perPage: +perPage!,
    });

    res.send({ plants: plants, totalPlants: total });
    // } else {
    //   const gardens = await getGardens(token);
    //   const plantsWithGardens = {
    //     plants: plants,
    //     gardens: gardens,
    //   };
    //   res.send(plantsWithGardens);
    // }
  } catch (error) {
    console.error("Error fetching plants:", error); // Log error
    res.status(400);
    res.statusMessage = "Error fetching plants";
  }
}

export default getPlants;
