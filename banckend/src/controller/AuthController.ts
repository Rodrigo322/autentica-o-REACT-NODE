import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.json({ error: "user not found" });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ error: "password invalid" });
    }

    const token = sign({ id: user.id }, "secret", { expiresIn: "1h" });

    const { id } = user;

    return res.json({ user: { id, email }, token });
  }
}
