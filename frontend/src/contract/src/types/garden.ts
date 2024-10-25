import { ObjectId } from "mongoose";

export type garden = {
  _id: ObjectId;
  userId: string;
  name: string;
  plantsId: number[];
};
