import { Field, ID, InputType, ObjectType } from "type-graphql";
import { ICard } from "../database/schemas/Card";
import Category from "./Category";
import Node from "./Node";
import User from "./User";

@ObjectType({ implements: Node })
class Card implements ICard, Node {

  @Field(type => ID, { nullable: false })
  id: any;

  @Field({ nullable: true })  
  name: string;

  @Field(type => Category, { nullable: true })  
  category: Category;

  @Field(type => User, { nullable: true })  
  owner: User;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}

@InputType()
export class CardMutationInput {
  @Field()  
  name: string;

  @Field()  
  category: string;

  @Field()  
  owner: string;
}

export default Card;