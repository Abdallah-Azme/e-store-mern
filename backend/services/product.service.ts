import { Product } from "../model/product.model";
import { ProductType } from "../schema/product.schema";

export const createProduct = (product: ProductType) => {
  return Product.create(product);
};

export const updateProduct = (id: string, product: ProductType) => {
  return Product.findByIdAndUpdate(id, product, { new: true });
};

export const deleteProduct = (id: string) => {
  return Product.findByIdAndDelete(id);
};

export const getProductsCount = (keyword: object) => {
  return Product.countDocuments({ ...keyword });
};

export const getProducts = (keyword?: object, limit: number = 12) => {
  return Product.find({ ...keyword })
    .limit(limit)
    .populate("category")
    .sort({ createdAt: -1 });
};

export const getProductById = (id: string) => {
  return Product.findById(id);
};
