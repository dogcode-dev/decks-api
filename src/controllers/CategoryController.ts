import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import Category from "../schemas/Category";
import MongoCategory from "../database/schemas/Category";

@Resolver(Category)
class CategoryController {

  @Query(returns => [Category], { name: 'categories' })
  @Authorized()
  async find() {
    const Categorys = await MongoCategory.find().select(['id', 'name', 'createdAt', 'updatedAt']);

    return Categorys;
  }

  @Query(returns => Category, { name: 'category' })
  @Authorized()
  async findById(
    @Arg("id") id: string
  ) {
    const Category = await MongoCategory.findById(id);

    if (!Category) {
      throw new Error('Category does not exists');
    }

    return Category;
  }

  @Mutation(returns => Category, { name: 'createCategory' })
  @Authorized()
  async create(
    @Arg("name") name: string,
  ) {

    const Category = await MongoCategory.create({ name });

    return Category;
  }

  @Mutation(returns => Category, {name: 'updateCategory'})
  @Authorized()
  async update(
    @Arg("id") id: string,
    @Arg("name") name: string,
  ) {

    const Category = await MongoCategory.findByIdAndUpdate( id, { name }, { new: true });

    return Category;

  }

}

export default CategoryController;
