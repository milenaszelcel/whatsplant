import { Schema, model } from "mongoose";
import type { Plant as IPlant } from "../../contract/src/plant";

const plantSchema = new Schema<IPlant>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  commonName: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
    required: true,
    unique: true,
  },
  otherName: {
    type: String,
    required: false,
    unique: false,
  },
  watering: {
    type: String,
    required: false,
    unique: false,
  },
  sunlight: {
    type: String,
    required: false,
    unique: false,
  },
  img: {
    type: String,
    required: false,
    unique: false,
  },
});

plantSchema.index({
  scientificName: "text",
  commonName: "text",
  otherName: "text",
});
const Plant = model<IPlant>("Plants", plantSchema);
export default Plant;
