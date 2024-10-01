import { model, Schema } from "mongoose";

const helpfulVariablesSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastPage: {
      type: Number,
    },
    lastPlantId: {
      type: Number,
    },
  },
  { _id: false }
);

const helpfulVariables = model("helpfulVariables", helpfulVariablesSchema);
export default helpfulVariables;
