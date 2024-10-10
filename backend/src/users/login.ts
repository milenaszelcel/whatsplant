import { Request, Response } from "express";
import User from "../schemas/userSchema";
import { registerValidationSchema } from "../../contract/src/schemas/registerSchema";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response) => {
  const validatedUser = await registerValidationSchema.validateAsync(req.body);

  if (await User.findOne({ email: validatedUser.email })) {
    const user = await User.findOne({ email: validatedUser.email });

    if (await bcrypt.compare(validatedUser.password, user!.password)) {
      res
        .cookie("cookie", "logged in", {
          httpOnly: false,
          secure: false,
        })
        .send("Sended");
    } else {
      res.statusMessage = "Incorrect password";
      res.status(400).end();
    }
  } else {
    res.statusMessage = "There is no such user";
    res.status(400).end();
  }
};
