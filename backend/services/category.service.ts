import { Category } from "../modles/catergory.model";
import { CategoryType } from "../schema/category.schema";

export const createCategory = (category: CategoryType) => {
  return Category.create(category);
};
