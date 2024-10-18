import { ObjectId } from "mongoose";

export type garden = {
  userId: number;
  name: string;
  plantsId: ObjectId[];
};
