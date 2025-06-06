import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../schemas/userSchema";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { registerValidationSchema } from "@greenmate/contract/src/schemas/registerValidationSchema";

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedUser = await registerValidationSchema.validateAsync(
      req.body
    );
    const existingUser = await User.findOne({ email: validatedUser.email });
    if (existingUser) {
      return res.status(409).send("User with that email already exists");
    }

    const userId = randomUUID();
    const hashed = await bcrypt.hash(validatedUser.password, 10);

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
      devices: [
        { userAgent: req.headers["user-agent"], refreshToken: refreshToken },
      ],
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

    return res.send("Sended");
  } catch (error) {
    console.error(error);
    return res.status(400).send(`Error: ${error}`);
  }
};
