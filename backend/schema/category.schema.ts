import { object, string, z } from "zod";

const CategoryPayload = {
  body: object({
    name: string({ required_error: "The category is required" }),
  }),
};

export const createCategorySchema = object({ ...CategoryPayload });
export type CategoryType = z.infer<typeof CategoryPayload.body>;
