import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import MongoCard, { ICardDocument } from "../database/schemas/Card";
import Card, { CardMutationInput } from "../schemas/Card";
import { Error } from "mongoose";

@Resolver(Card)
class CardController {

    @Query(returns => [Card], { name: 'cards' })
    @Authorized()
    static async find() {
        const cards = await MongoCard.find().select(['id', 'name', "category", "owner", 'createdAt', 'updatedAt']);
    
        return cards;
    }

    @Query(returns => Card, { name: 'card' })
    @Authorized()
    static async findById(
        @Arg("id") id: string
    ) {
        const card = await MongoCard.findById(id);

        if (!card) {
        throw new Error('Card does not exists');
        }

        return card;
    }

    @Mutation(returns => Card, { name: 'createCard' })
    @Authorized()
    static async create(
        @Arg("data") data: CardMutationInput,    
    ) {
  
        const { name, category, owner } = data;

        const existedCard = await this.exists(name);
        if(existedCard) {
            return existedCard;
        }

        const card = await MongoCard.create({ name, category, owner });
        return await MongoCard.findById(card.id).populate('category').populate('owner').exec();

    }
    
    /*
    @Mutation(returns => Card, {name: 'updateCard'})
    @Authorized()
    async update(
        @Arg("id") id: string, 
        @Arg("name") name?: string, 
        @Arg("category") category?: string, 
    ) {
        const existedCard = await this.exists(name);
        if(existedCard) {
            return existedCard;
        }

        const card = await MongoCard.findByIdAndUpdate(id, { name, category }, { new: true }, function(err: any, card: Card): Promise<ICardDocument | null> {
            if (err) throw new Error(err);
            return MongoCard.findById(card.id).populate('category').exec();
        });

        return card;
    }*/

    @Query(returns => Boolean, {name: "existsCard"})
    static async exists(
        @Arg("name") name?: string,
    ) {
        if(!name) return false;
        const filter = { name: { $regex: name, $options: 'i' }};
        return await MongoCard.exists({ filter });
    }

}

export default CardController;