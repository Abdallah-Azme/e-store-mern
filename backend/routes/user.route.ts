import express from "express";
import {
  createUserHandler,
  loginUserHandler,
  logoutHandler,
} from "../controllers/user.controller";
import { validator } from "../middlewares/validator";
import { createUserSchema, loginUserSchema } from "../schema/user.schema";
import { requireUser } from "../middlewares/require.user";

const userRoutes = express.Router();

userRoutes
  .route("/")
  .post(validator(createUserSchema), createUserHandler)
  .get(requireUser, logoutHandler);
userRoutes.route("/login").post(validator(loginUserSchema), loginUserHandler);

export default userRoutes;
