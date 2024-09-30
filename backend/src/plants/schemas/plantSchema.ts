import { Schema, model } from "mongoose";

interface IPlant {
  id: number;
  commonName: string;
  otherName: string;
  watering: string;
  sunlight: string;
  img: string;
}

const plantSchema = new Schema<IPlant>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  commonName: {
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

const Plant = model<IPlant>("Plants", plantSchema);
export default Plant;
