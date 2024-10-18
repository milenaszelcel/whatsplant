import { model, Schema, ObjectId } from "mongoose";

const gardenSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: false,
  },
  plantsId: {
    type: Array<ObjectId>,
  },
});

const Garden = model("Gardens", gardenSchema);
export default Garden;
