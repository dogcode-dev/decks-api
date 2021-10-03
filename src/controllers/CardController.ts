import Card from "../database/schemas/Card";
import { Error } from "mongoose";
import { Request, Response } from "express";

class CardController {
  static async find(request: Request, response: Response) {
    try {
      const cards = await Card.find().populate(["category", "owner"]);
      return response.json(cards);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async findById(request: Request, response: Response) {
    try {
      const card = await Card.findById(request.params.id);

      if (!card) {
        throw new Error("Card does not exists");
      }

      return response.json(card);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async create(request: Request, response: Response) {
    const { name, category, owner } = request.body;

    try {
      // const existedCard = await this.exists(name);
      // if (existedCard) {
      //   return existedCard;
      // }

      const card = await Card.create({ name, category, owner });
      return response.json(card);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
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

        const card = await Card.findByIdAndUpdate(id, { name, category }, { new: true }, function(err: any, card: Card): Promise<ICardDocument | null> {
            if (err) throw new Error(err);
            return Card.findById(card.id).populate('category').exec();
        });

        return card;
    }*/

  static async exists(name?: string) {
    if (!name) {
      return false;
    }

    const filter = { name: { $regex: name, $options: "i" } };
    return await Card.exists({ filter });
  }
}

export default CardController;
