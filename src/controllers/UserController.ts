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
    try {
      const user = await User.findById(request.params.id);

      if (!user) {
        throw new Error("User does not exists");
      }

      return response.json(user);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async create(request: Request, response: Response) {
    try {
      const { name, email, nick, password } = request.body;

      const hashedPassword = await hash(password, 8);

      const user = await User.create({
        nick,
        name,
        email,
        password: hashedPassword,
      });

      return response.json(user);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }
}

export default UserController;
