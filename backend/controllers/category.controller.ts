import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { createCategory } from "../services/category.service";

export const createCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await createCategory({ name });

    return res.status(201).json(category);
  }
);
