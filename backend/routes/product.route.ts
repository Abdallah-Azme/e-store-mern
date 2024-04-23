import express from "express";

import { validator } from "../middlewares/validator";
import { requireUser } from "../middlewares/require.user";
import { authorized } from "../middlewares/authorized";
import {
  addProductReview,
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getNewProductsHandler,
  getProductHandler,
  getProductsHandler,
  getTopProductsHandler,
  updateProductHandler,
} from "../controllers/product.controller";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../schema/product.schema";
import { createReviewSchema } from "../schema/review.schema";

const productRoutes = express.Router();

productRoutes.route("/allProducts").get(getAllProductsHandler);

productRoutes.route("/top").get(getTopProductsHandler);
productRoutes.route("/new").get(getNewProductsHandler);

//review
productRoutes
  .route("/:id/reviews")
  .post(validator(createReviewSchema), requireUser, addProductReview);

productRoutes
  .route("/")
  .get(getProductsHandler)
  .post(
    validator(createProductSchema),
    requireUser,
    authorized,
    createProductHandler
  );
productRoutes
  .route("/:id")
  .put(
    validator(updateProductSchema),
    requireUser,
    authorized,
    updateProductHandler
  )
  .delete(
    validator(deleteProductSchema),
    requireUser,
    authorized,
    deleteProductHandler
  )
  .get(
    validator(getProductSchema),

    getProductHandler
  );

export { productRoutes };
