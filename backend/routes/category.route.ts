import express from "express";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoryHandler,
  updateCategoryHandler,
} from "../controllers/category.controller";
import { requireUser } from "../middlewares/require.user";
import { authorized } from "../middlewares/authorized";
import { validator } from "../middlewares/validator";
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema";

const categoryRoutes = express.Router();

categoryRoutes
  .route("/")
  .post(
    validator(createCategorySchema),
    requireUser,
    authorized,
    createCategoryHandler
  );
categoryRoutes.route("/categories").get(getCategoriesHandler);

categoryRoutes
  .route("/:categoryId")
  .put(
    validator(updateCategorySchema),
    requireUser,
    authorized,
    updateCategoryHandler
  )
  .get(validator(getCategorySchema), getCategoryHandler)
  .delete(
    validator(getCategorySchema),
    requireUser,
    authorized,
    deleteCategoryHandler
  );

export { categoryRoutes };
