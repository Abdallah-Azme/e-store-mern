import { Category } from "../model/category.model";
import { CategoryType } from "../schema/category.schema";

export const createCategory = (category: CategoryType) => {
  return Category.create(category);
};

export const findCategories = () => {
  return Category.find({});
};
export const findCategoryById = (categoryId: string) => {
  return Category.findById(categoryId);
};

export const updateCategoryById = (
  categoryId: string,
  newCategory: CategoryType
) => {
  return Category.findByIdAndUpdate(categoryId, newCategory, { new: true });
};

export const deleteCategoryById = (categoryId: string) => {
  return Category.findByIdAndDelete(categoryId);
};
