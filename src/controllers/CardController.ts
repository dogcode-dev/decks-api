import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import MongoCard, { ICardDocument } from "../database/schemas/Card";
import Card, { CardMutationInput } from "../schemas/Card";
import { Error } from "mongoose";

@Resolver(Card)
class CardController {

    @Query(returns => [Card], { name: 'cards' })
    @Authorized()
    async find() {
        const Cards = await MongoCard.find().select(['id', 'name', "Card", "owner", 'createdAt', 'updatedAt']);
    
        return Cards;
    }

    @Query(returns => Card, { name: 'card' })
    @Authorized()
    async findById(
        @Arg("id") id: string
    ) {
        const Card = await MongoCard.findById(id);

        if (!Card) {
        throw new Error('Card does not exists');
        }

        return Card;
    }

    @Mutation(returns => Card, { name: 'createCard' })
    @Authorized()
    async create(
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
    async exists(
        @Arg("name") name?: string,
    ) {
        if(!name) return false;
        const filter = { name: { $regex: name, $options: 'i' }};
        return await MongoCard.exists({filter});
    }

}

export default CardController;