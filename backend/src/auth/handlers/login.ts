import type { Request, Response } from "express";
import User from "../../schemas/userSchema";
import { registerValidationSchema } from "../../../contract/src/schemas/registerSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const validatedUser = await registerValidationSchema.validateAsync(
      req.body
    );

    const existingUser = await User.findOne({ email: validatedUser.email });
    if (!existingUser) {
      return res.status(409).send("There is no such user");
    }

    if (
      !(await bcrypt.compare(validatedUser.password, existingUser!.password))
    ) {
      return res.status(409).send("Incorrect password");
    }

    const refreshToken = jwt.sign({ userId: existingUser.id }, "SECRET_KEY", {
      expiresIn: "365d",
    });
    const accessToken = jwt.sign({ userId: existingUser.id }, "SECRET_KEY", {
      expiresIn: "15m",
    });

    const newDevice = {
      userAgent: req.headers["user-agent"],
      refreshToken: refreshToken,
    };

    await User.findOneAndUpdate(
      { id: existingUser.id },
      { $push: { devices: newDevice } },
      { new: true }
    );

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
