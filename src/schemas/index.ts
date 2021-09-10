import { buildSchemaSync } from 'type-graphql';
import User from './User';
import UserController from '../controllers/UserController';
import Auth from './Auth';
import SessionController from '../controllers/SessionController';
import Category from './Category';
import CategoryController from '../controllers/CategoryController';
import Card from './Card';
import CardController from '../controllers/CardController';
import Question from './Question';
import QuestionController from '../controllers/QuestionController';

import AuthenticationAssurance from "../middlewares/AuthenticationAssurance";

import Node from "./Node";

const schema = buildSchemaSync({
  resolvers: [ Category, CategoryController, Card, CardController, Question, QuestionController, User, UserController, Auth, SessionController, Node ],
  authChecker: AuthenticationAssurance
})

export default schema;
