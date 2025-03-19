import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../schemas/userSchema";

type TokenData = { userId: string };

export const checkAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const uncodedToken = jwt.verify(refreshToken, "SECRET_KEY") as TokenData;
    const user = await User.findOne({
      id: uncodedToken?.userId,
      devices: { $elemMatch: { refreshToken: refreshToken } },
    });
    if (!user) {
      res.status(401).json({ message: "Not authenticated" });
    }
    req.user = { id: user?.id, email: user?.email, role: user?.role };

    return next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
