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
  plantsId: {
    type: [Number],
  },
});

const Garden = model("Gardens", gardenSchema);
export default Garden;
