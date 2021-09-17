import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import Category from "../schemas/Category";
import MongoCategory from "../database/schemas/Category";

@Resolver(Category)
class CategoryController {

  @Query(returns => [Category], { name: 'categories' })
  @Authorized()
  static async find() {
    const categories = await MongoCategory.find().select(['id', 'name', 'createdAt', 'updatedAt']);

    return categories;
  }

  @Query(returns => Category, { name: 'category' })
  @Authorized()
  static async findById(
    @Arg("id") id: string
  ) {
    const category = await MongoCategory.findById(id);

    if (!category) {
      throw new Error('Category does not exists');
    }

    return category;
  }

  @Mutation(returns => Category, { name: 'createCategory' })
  @Authorized()
  static async create(
    @Arg("name") name: string,
  ) {

    const category = await MongoCategory.create({ name });

    return category;
  }

  @Mutation(returns => Category, {name: 'updateCategory'})
  @Authorized()
  static async update(
    @Arg("id") id: string,
    @Arg("name") name: string,
  ) {

    const category = await MongoCategory.findByIdAndUpdate( id, { name }, { new: true });

    return category;

  }

}

export default CategoryController;
