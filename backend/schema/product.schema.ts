import { isValidObjectId } from "mongoose";
import { object, string, z } from "zod";

const ProductPayload = {
  body: object({
    name: string({ required_error: "The name is required" }),
    description: string({ required_error: "The description is required" }),
    price: string({ required_error: "The price is required" }),
    category: string({ required_error: "The category is required" }),
    quantity: string({ required_error: "The quantity is required" }),
    brand: string({ required_error: "The brand is required" }),
    image: string({ required_error: "The brand is required" }),
  }),
};

const ProductParams = {
  params: object({
    id: string({ required_error: "The product id is required" }),
  }).refine((data) => isValidObjectId(data.id), {
    message: "Enter valid product id",
  }),
};

export const createProductSchema = object({ ...ProductPayload });

export const updateProductSchema = object({
  ...ProductPayload,
  ...ProductParams,
});

export const getProductSchema = object({
  ...ProductParams,
});

export const deleteProductSchema = object({
  ...ProductParams,
});

export type ProductType = z.infer<typeof ProductPayload.body>;
