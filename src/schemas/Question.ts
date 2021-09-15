import { Field, ID, InputType, ObjectType } from 'type-graphql';
import Card from './Card';
import { IQuestion } from '../database/schemas/Question';
import Node from './Node';

@ObjectType({ implements: Node })
class Question implements IQuestion, Node {

  @Field(type => ID, { nullable: false })
  id: any;

  @Field({ nullable: true })
  card: Card;

  @Field({ nullable: true })
  question: string;

  @Field({ nullable: true })
  answer: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}

@InputType()
export class QuestionMutationInput {
  @Field()
  card: string;

  @Field()
  question: string;

  @Field()
  answer: string;
}

export default Question;