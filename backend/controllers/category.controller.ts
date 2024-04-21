import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  createCategory,
  deleteCategoryById,
  findCategories,
  findCategoryById,
  updateCategoryById,
} from "../services/category.service";

export const createCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await createCategory({ name });

    return res.status(201).json(category);
  }
);
export const updateCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await updateCategoryById(categoryId, { name });

    return res.status(201).json(category);
  }
);
export const deleteCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const category = await deleteCategoryById(categoryId);

    return res.json(category);
  }
);
export const getCategoriesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await findCategories();

    return res.json(categories);
  }
);
export const getCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    const category = await findCategoryById(categoryId);

    return res.json(category);
  }
);
