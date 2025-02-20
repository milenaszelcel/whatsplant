import { Request, Response } from "express";
import { registerValidationSchema } from "../../../contract/src/schemas/registerSchema";
import bcrypt from "bcryptjs";
import User from "../../schemas/userSchema";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  const validatedUser = await registerValidationSchema.validateAsync(req.body);
  const saltRounds = 10;
  const hashed = await bcrypt.hash(validatedUser.password, saltRounds);
  if (!(await User.findOne({ email: validatedUser.email }))) {
    const userId = randomUUID();

    const userAgent = req.headers["user-agent"];

    const refreshToken = jwt.sign({ userId: userId }, "SECRET_KEY", {
      expiresIn: "365d",
    });

    const accessToken = jwt.sign({ userId: userId }, "SECRET_KEY", {
      expiresIn: "15m",
    });

    const newUser = new User({
      id: userId,
      email: validatedUser.email,
      password: hashed,
      devices: [{ userAgent: userAgent, refreshToken: refreshToken }],
    });
    try {
      await newUser.save();
      res.cookie("accessToken", accessToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: false,
        secure: false,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        secure: false,
      });
      res.send("Sended");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.statusMessage = "User with that email already exist";
    res.status(400).end();
  }
};
