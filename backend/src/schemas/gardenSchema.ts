import type { GardenObject } from "@greenmate/contract";
import { model, Schema } from "mongoose";

const gardenSchema = new Schema<GardenObject>({
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
          default: 0,
        },
      },
    ],
  },
});

const Garden = model("Gardens", gardenSchema);
export default Garden;
