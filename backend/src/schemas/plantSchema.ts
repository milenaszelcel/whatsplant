import { Schema, model } from "mongoose";
import { Plant } from "../../contract/src/plant";

const plantSchema = new Schema<Plant>({
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
const Plant = model<Plant>("Plants", plantSchema);
export default Plant;
