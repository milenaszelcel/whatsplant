import { garden } from "../../contract/src/types/garden";
import { model, Schema } from "mongoose";

const gardenSchema = new Schema<garden>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  plants: {
    _id: false,
    type: [
      {
        plantId: {
          type: Number,
          required: true,
        },
        waterValue: {
          type: Number,
        },
      },
    ],
  },
});

const Garden = model("Gardens", gardenSchema);
export default Garden;
