import { ICategory } from '../database/schemas/Category';
import { Field, ID, ObjectType } from 'type-graphql';
import Node from './Node';

@ObjectType({ implements: Node })
class Category implements ICategory, Node {

  @Field(type => ID, { nullable: false })
  id: any;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}

export default Category;
