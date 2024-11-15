import Garden from "../../src/schemas/gardenSchema";
import { uncodeUserFromToken } from "../../src/users/uncodeUserFromToken";

export const getGardens = async (token: string) => {
  const userId = await uncodeUserFromToken(token);

  const gardens = await Garden.find({ userId: userId });
  const filteredGardensData = gardens.map(({ name, _id }) => ({ name, _id }));
  return filteredGardensData;
};
