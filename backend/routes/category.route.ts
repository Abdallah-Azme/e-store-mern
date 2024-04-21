import express from "express";
import { createCategoryHandler } from "../controllers/category.controller";
import { requireUser } from "../middlewares/require.user";
import { authorized } from "../middlewares/authorized";
import { validator } from "../middlewares/validator";
import { createCategorySchema } from "../schema/category.schema";

const categoryRoutes = express.Router();

categoryRoutes
  .route("/")
  .post(
    validator(createCategorySchema),
    requireUser,
    authorized,
    createCategoryHandler
  );

export { categoryRoutes };
