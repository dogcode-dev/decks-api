import Category from "../database/schemas/Category";
import { Request, Response } from "express";

class CategoryController {
  static async find(request: Request, response: Response) {
    try {
      const categories = await Category.find().populate("cards");

      return response.json(categories);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async findById(request: Request, response: Response) {
    try {
      const category = await Category.findById(request.params.id);

      if (!category) {
        throw new Error("Category does not exists");
      }

      return response.json(category);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async create(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const category = await Category.create({ name });

      return response.json(category);
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }

  static async update(request: Request, response: Response) {
    const category = await Category.findByIdAndUpdate(
      request.params.id,
      { name: request.body.name },
      { new: true }
    );

    return response.json(category);
  }

  static async delete(request: Request, response: Response) {
    try {
      const category = await Category.findById(request.params.id);

      if (!category) {
        throw new Error("Category does not exists");
      }

      await Category.findByIdAndRemove(request.params.id);
      return response.status(202).json({ message: "Deleted" });
    } catch (e) {
      return response.status(500).json({
        error: e,
      });
    }
  }
}

export default CategoryController;
