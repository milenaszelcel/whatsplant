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
    const newUser = new User({
      id: randomUUID(),
      email: validatedUser.email,
      password: hashed,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser.id }, "SECRET_KEY");
    res
      .cookie("cookie", token, {
        httpOnly: false,
        secure: false,
        expires: new Date(Date.now() + 1 * 3600000),
      })
      .send("Wyslano");
  } else {
    res.statusMessage = "Uzytkownik juz istnieje";
    res.status(400).end();
  }
};
