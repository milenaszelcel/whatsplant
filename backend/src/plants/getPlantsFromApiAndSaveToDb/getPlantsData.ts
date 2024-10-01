import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.API_URL;
export const getPlantsData = async (page: number) => {
  if (!URL) {
    throw Error("Nie ma url");
  }

  const response = await axios.get(`${URL}&page=${page}`);

  return response.data;
};
