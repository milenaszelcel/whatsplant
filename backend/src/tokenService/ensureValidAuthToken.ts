import { Request, Response, NextFunction } from "express";
import { refreshTokens } from "./refreshTokens";
import jwt from "jsonwebtoken";

type TokenData = { userId: string; exp: number };

export const ensureValidAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!refreshToken) {
    return next();
  }

  if (!accessToken) {
    try {
      await refreshTokens(req, res);
      return next();
    } catch (error) {
      return res.status(401).json({ error: "Unable to update token" });
    }
  }
  try {
    const decodedAccessToken = jwt.decode(accessToken) as TokenData;
    const tokenExpirationDate = decodedAccessToken.exp;
    if (
      typeof tokenExpirationDate !== "number" ||
      tokenExpirationDate < Date.now() / 1000
    ) {
      await refreshTokens(req, res);
    }
    return next();
  } catch (error) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return next();
  }
};
