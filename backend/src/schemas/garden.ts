import { model, Schema, ObjectId } from "mongoose";

const gardenSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  user_id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: false,
  },
  plants_id: {
    type: Array<ObjectId>,
  },
});
