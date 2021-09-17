import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import User from "../schemas/User";
import MongoUser from "../database/schemas/User";
import { hash } from 'bcryptjs';

@Resolver(User)
class UserController {

  @Query(returns => [User], { name: 'users' })
  @Authorized()
  static async find() {
    const users = await MongoUser.find().select(['id', 'name', 'email', 'nick', 'createdAt', 'updatedAt']);

    return users;
  }

  @Query(returns => User, { name: 'user' })
  @Authorized()
  static async findById(
    @Arg("id") id: string
  ) {
    const user = await MongoUser.findById(id);

    if (!user) {
      throw new Error('User does not exists');
    }

    return user;
  }

  @Mutation(returns => User, { name: 'createUser' })
  static async create(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("nick") nick: string,
    @Arg("password") password: string,
  ) {
    const hashedPassword = await hash(password, 8);

    const user = await MongoUser.create({ nick, name, email, password: hashedPassword });

    return user;
  }
}

export default UserController;
