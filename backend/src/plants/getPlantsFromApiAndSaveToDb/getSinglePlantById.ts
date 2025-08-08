import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.API_SINGLE_PLANT_URL;
const API_KEY = process.env.API_KEY;

export const getSinglePlantById = async (id: number) => {
  if (!URL) {
    throw Error("Nie ma url");
  }
  const response = await axios.get(`${URL}/${id}?key=${API_KEY}`);
  return response.data;
};
