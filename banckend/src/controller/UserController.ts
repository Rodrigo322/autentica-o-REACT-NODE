import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";
import { Request, Response } from "express";

export class UserController {
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json(users);
  }
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.json({ error: "user exists" });
    }

    const hash_password = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_password,
      },
    });
    user.password = "";
    return res.json({ user });
  }
}
