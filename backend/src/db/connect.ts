import mongoose from "mongoose";
export const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("MongoDb Connected");
};
