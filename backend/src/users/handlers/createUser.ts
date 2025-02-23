import type { Request, Response } from "express";
import { registerValidationSchema } from "../../../contract/src/schemas/registerSchema";
import bcrypt from "bcryptjs";
import User from "../../schemas/userSchema";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedUser = await registerValidationSchema.validateAsync(
      req.body
    );
    if (await User.findOne({ email: validatedUser.email }))
      return res.status(400).send("User with that email already exists");

    const hashed = await bcrypt.hash(validatedUser.password, 10);
    const userId = randomUUID();
    const refreshToken = jwt.sign({ userId }, "SECRET_KEY", {
      expiresIn: "365d",
    });
    const accessToken = jwt.sign({ userId }, "SECRET_KEY", {
      expiresIn: "15m",
    });

    const newUser = new User({
      id: userId,
      email: validatedUser.email,
      password: hashed,
      devices: [{ userAgent: req.headers["user-agent"], refreshToken }],
    });

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
    res.status(400).send(error);
  }
};
