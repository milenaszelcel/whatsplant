import { Schema, model } from "mongoose";

const plantSchema = new Schema({
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
  indoor: {
    type: Boolean,
    required: true,
  },
  otherName: {
    type: String,
    required: false,
    unique: false,
  },
  description: {
    type: String,
    required: false,
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
const Plant = model("Plants", plantSchema);
export default Plant;
