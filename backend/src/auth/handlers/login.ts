import { Request, Response } from "express";
import User from "../../schemas/userSchema";
import { registerValidationSchema } from "../../../contract/src/schemas/registerSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const validatedUser = await registerValidationSchema.validateAsync(req.body);

  if (await User.findOne({ email: validatedUser.email })) {
    const user = await User.findOne({ email: validatedUser.email });

    if (await bcrypt.compare(validatedUser.password, user!.password)) {
      const refreshToken = jwt.sign({ userId: user?.id }, "SECRET_KEY", {
        expiresIn: "365d",
      });

      const accessToken = jwt.sign({ userId: user?.id }, "SECRET_KEY", {
        expiresIn: "15m",
      });

      const newDevice = {
        userAgent: req.headers["user-agent"],
        refreshToken: refreshToken,
      };

      await User.findOneAndUpdate(
        { id: user!.id },
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

      res.send("Sended");
    } else {
      res.statusMessage = "Incorrect password";
      res.status(400).end();
    }
  } else {
    res.statusMessage = "There is no such user";
    res.status(400).end();
  }
};
