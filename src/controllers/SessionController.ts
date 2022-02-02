import MongoUser from "../database/schemas/User";
import { compare } from "bcryptjs";
import AuthConfig from "../config/auth";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
class AuthController {
  static async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await MongoUser.findOne({
      $or: [
        {
          email,
        },
        {
          nick: email,
        },
      ],
    });

    if (!user) {
      // throw new Error("Incorrect email/password combination.");
      return response.status(500).json({
        status: "error",
        message: "Incorrect email/password combination.",
      });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      // throw new Error("Incorrect email/password combination.");
      return response.status(500).json({
        status: "error",
        message: "Incorrect email/password combination.",
      });
    }

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: `${user.id}`,
      expiresIn,
    });

    return response.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        nick: user.nick,
      },
    });
  }
}

export default AuthController;
