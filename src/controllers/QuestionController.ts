import Question from "../database/schemas/Question";
import { Request, Response } from "express";
class QuestionController {
  static async find(request: Request, response: Response) {
    try {
      const questions = await Question.find();

      return response.json(questions);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async findById(request: Request, response: Response) {
    try {
      const question = await Question.findById(request.params.id);

      if (!question) {
        throw new Error("Question does not exists");
      }

      return question;
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async create(request: Request, response: Response) {
    try {
      const { card, question, answer } = request.body;

      const createdQuestion = await Question.create({ card, question, answer });
      return response.json(createdQuestion);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  /*
    @Mutation(returns => Question, {name: 'updateQuestion'})
    @Authorized()
    async update(
        @Arg('id') id: string, 
        @Arg('card') card?: string, 
        @Arg('question') question?: string, 
        @Arg('answer') answer?: string, 
    ) {

        const Question = await Question.findByIdAndUpdate(id, { question, answer, card }, { new: true }, function(err: any, question: Question): Promise<ICardDocument | null> {
            if (err) throw new Error(err);
            return Question.findById(question.id).populate('card').exec();
        });

        return Question;
    }
    */
}

export default QuestionController;
