import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import Question, { QuestionMutationInput } from '../schemas/Question';
import MongoQuestion, { IQuestionDocument } from '../database/schemas/Question';

@Resolver(Question)
class QuestionController {

    @Query(returns => [Question], { name: 'questions' })
    @Authorized()
    static async find() {
        const questions = await MongoQuestion.find().select(['id', 'card', 'question', 'answer', 'createdAt', 'updatedAt']);
    
        return questions;
    }

    @Query(returns => Question, { name: 'question' })
    @Authorized()
    static async findById(
        @Arg('id') id: string
    ) {
        const quest = await MongoQuestion.findById(id);

        if (!quest) {
            throw new Error('Question does not exists');
        }

        return quest;
    }

    @Mutation(returns => Question, { name: 'createQuestion' })
    @Authorized()
    static async create(
        @Arg('data') data: QuestionMutationInput,    
    ) {
  
        const { card, question, answer } = data;

        const Question = await MongoQuestion.create({ card, question, answer });
        return await MongoQuestion.findById(Question.id).populate('card').exec();

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

        const Question = await MongoQuestion.findByIdAndUpdate(id, { question, answer, card }, { new: true }, function(err: any, question: Question): Promise<ICardDocument | null> {
            if (err) throw new Error(err);
            return MongoQuestion.findById(question.id).populate('card').exec();
        });

        return Question;
    }
    */

}

export default QuestionController;