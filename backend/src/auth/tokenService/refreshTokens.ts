import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../schemas/userSchema";

type TokenData = { userId: string };

export const refreshTokens = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const uncodedToken = jwt.verify(refreshToken, "SECRET_KEY") as TokenData;
  const user = await User.findOne({
    id: uncodedToken?.userId,
    devices: { $elemMatch: { refreshToken: refreshToken } },
  });
  if (!user) {
    return console.log("nie ma");
  }
  try {
    const newRefreshToken = jwt.sign({ userId: user.id }, "SECRET_KEY", {
      expiresIn: "365d",
    });
    const newAccessToken = jwt.sign({ userId: user?.id }, "SECRET_KEY", {
      expiresIn: "15m",
    });
    const newDevice = {
      userAgent: req.headers["user-agent"],
      refreshToken: newRefreshToken,
    };

    await User.findOneAndUpdate(
      { id: uncodedToken.userId },
      { $push: { devices: newDevice } },
      { new: true }
    );
    res.cookie("accessToken", newAccessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: false,
      secure: false,
    });
    res.cookie("refreshToken", newRefreshToken, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
    });

    console.log("Udało sie");
  } catch (error) {
    console.log(error);
  }
};
