import jwt from "jsonwebtoken";

export const uncodeUserFromToken = async (token: string) => {
  const uncodedCookies = (await jwt.verify(token, "SECRET_KEY")) as {
    userId: string;
  };
  const userId = uncodedCookies.userId;
  return userId;
};
