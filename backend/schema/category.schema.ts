import { isValidObjectId } from "mongoose";
import { object, string, z } from "zod";

const CategoryPayload = {
  body: object({
    name: string({ required_error: "The category is required" }),
  }),
};
const CategoryParams = {
  params: object({
    categoryId: string({ required_error: "The category id is required" }),
  }).refine((data) => isValidObjectId(data.categoryId), {
    message: "Enter valid category id",
  }),
};

export const createCategorySchema = object({ ...CategoryPayload });
export const updateCategorySchema = object({
  ...CategoryPayload,
  ...CategoryParams,
});
export const getCategorySchema = object({
  ...CategoryParams,
});
export type CategoryType = z.infer<typeof CategoryPayload.body>;
