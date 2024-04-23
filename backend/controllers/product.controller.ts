import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsCount,
  updateProduct,
} from "../services/product.service";
import { Product } from "../model/product.model";

export const createProductHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, price, category, quantity, brand, image } =
      req.body;

    const product = await createProduct({
      name,
      description,
      price,
      category,
      quantity,
      brand,
      image,
    });

    res.status(201).json(product);
  }
);
export const updateProductHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, price, category, quantity, brand, image } =
      req.body;
    const { id } = req.params;
    const product = await updateProduct(id, {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      image,
    });

    res.status(201).json(product);
  }
);
export const deleteProductHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await deleteProduct(id);

    res.json(product);
  }
);
export const getProductsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const countOfProducts = await getProductsCount({ keyword });
    const products = await getProducts(keyword, pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(countOfProducts / pageSize),
      hasMore: false,
    });
  }
);
export const getProductHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(id);

    res.json(product);
  }
);
export const getAllProductsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await getProducts();

    res.json(products);
  }
);
export const getTopProductsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find({}).limit(4).sort({ rating: -1 });
    res.json(products);
  }
);
export const getNewProductsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find({}).limit(5).sort({ _id: -1 });
    res.json(products);
  }
);
export const addProductReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { rating, comment } = req.body;
    const { id } = req.params;
    const product = await getProductById(id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        //@ts-ignore
        (review) => review.user.toString() === res.locals.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("product already reviewed");
      }
      const review = {
        name: res.locals.user.username,
        rating: +rating,
        comment,
        user: res.locals.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        //@ts-ignore
        product.reviews.reduce((acc, item) => Number(item.rating) + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json();
  }
);
