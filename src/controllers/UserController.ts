import User from "../database/schemas/User";
import { hash } from "bcryptjs";
import { Request, Response } from "express";

class UserController {
  static async find(request: Request, response: Response) {
    try {
      const users = await User.find();
      return response.json(users);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async findById(request: Request, response: Response) {
    const user = await User.findById(request.params.id);

    if (!user) {
      return response.status(500).json({
        message: "User does not exists",
      });
    }

    return response.json(user);
  }

  static async create(request: Request, response: Response) {
    const { name, email, nick, password } = request.body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return response.status(500).json({
        message: "Usuário já existe com e-mail ou nome de usuário",
      });
    }

    const nickExists = await User.findOne({ nick });

    if (nickExists) {
      return response.status(500).json({
        message: "Usuário já existe com e-mail ou nome de usuário",
      });
    }

    const hashedPassword = await hash(password, 8);

    const user = await User.create({
      nick,
      name,
      email,
      password: hashedPassword,
    });

    return response.json(user);
  }
}

export default UserController;
