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

    const user = await User.findOne({ email: validatedUser.email });

    if (!user) return res.status(400).send("There is no such user");

    if (!(await bcrypt.compare(validatedUser.password, user.password)))
      return res.status(400).send("Incorrect password");

    const refreshToken = jwt.sign({ userId: user.id }, "SECRET_KEY", {
      expiresIn: "365d",
    });
    const accessToken = jwt.sign({ userId: user.id }, "SECRET_KEY", {
      expiresIn: "15m",
    });

    await User.findOneAndUpdate(
      { id: user.id },
      {
        $push: {
          devices: { userAgent: req.headers["user-agent"], refreshToken },
        },
      },
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

    res.send("Sended");
  } catch (error) {
    res.status(400).send(error);
  }
};
