import MongoUser from "../database/schemas/User";
import { hash } from "bcryptjs";
import { Request, Response } from "express";

class UserController {
  static async find(request: Request, response: Response) {
    try {
      const users = await MongoUser.find().select([
        "id",
        "name",
        "email",
        "nick",
        "createdAt",
        "updatedAt",
      ]);

      return response.json(users);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async findById(request: Request, response: Response) {
    try {
      const user = await MongoUser.findById(request.params.id);

      if (!user) {
        throw new Error("User does not exists");
      }

      return user;
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

      const user = await MongoUser.create({
        nick,
        name,
        email,
        password: hashedPassword,
      });

      return user;
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }
}

export default UserController;
