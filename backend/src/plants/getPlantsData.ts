import axios from "axios";

const URL = process.env.API_URL;
export const getPlantsData = async (page: number) => {
  if (!URL) {
    throw Error("Nie ma url");
  }

  const response = await axios.get(`${URL}&page=${page}`);
  console.log(JSON.stringify(response.data["data"]));
  return response.data;
};
