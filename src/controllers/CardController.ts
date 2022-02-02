import Card from "../database/schemas/Card";
import { Types, Error } from "mongoose";
import { Request, Response } from "express";
import { User } from "../database/schemas";

const ObjectId = require("mongodb").ObjectID;
class CardController {
  static async find(request: Request, response: Response) {
    try {
      const cards = await Card.find()
        .populate("category", { id: 1, name: 1 })
        .populate("owner", { id: 1, name: 1 });
      return response.json(cards);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async findById(request: Request, response: Response) {
    try {
      const card = await Card.findById(request.params.id).populate("category", {
        id: 1,
        name: 1,
      });

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
    const { name, category, description } = request.body;

    // console.log(new ObjectId(request.user.id));
    request.body.owner = request.user.id;

    try {
      const card = await Card.create(request.body);
      return response.json(card);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async update(request: Request, response: Response) {
    const { name, category, description } = request.body;

    let card = await Card.findById(request.params.id);

    if (!card) {
      throw new Error("Card does not exists");
    }

    card = await Card.findByIdAndUpdate(
      request.params.id,
      { name, category, description },
      { new: true }
    );

    return response.json(card);
  }

  static async exists(name?: string) {
    if (!name) {
      return false;
    }

    const filter = { name: { $regex: name, $options: "i" } };
    return await Card.exists({ filter });
  }

  static async delete(request: Request, response: Response) {
    try {
      const card = await Card.findById(request.params.id);

      if (!card) {
        throw new Error("Card does not exists");
      }

      await Card.findByIdAndRemove(request.params.id);
      return response.status(202).json({ message: "Deleted" });
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }
}

export default CardController;
