import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },

  devices: [
    {
      userAgent: String,
      refreshToken: String,
    },
  ],
});

const User = model("Users", userSchema);
export default User;
