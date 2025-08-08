import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.API_LIST_OF_PLANTS_URL;
const API_KEY = process.env.API_KEY;
export const getPlantsData = async (page: number) => {
  if (!URL) {
    throw Error("Nie ma url");
  }

  const response = await axios.get(`${URL}?key=${API_KEY}&page=${page}`);

  return response.data;
};
