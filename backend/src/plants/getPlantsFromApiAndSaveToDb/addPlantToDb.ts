import { ApiPlant } from "../../types/apiPlant";
import { createPlant } from "./plantMapper";

export const addPlantToDb = async (apiPlant: ApiPlant) => {
  const newPlant = createPlant(apiPlant);
  await newPlant.save();
  console.log("Dodajem");
};