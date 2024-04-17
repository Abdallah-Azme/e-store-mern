import express from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  loginUserHandler,
  logoutHandler,
  meHandler,
  updateMeHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import { validator } from "../middlewares/validator";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  userParamsSchema,
} from "../schema/user.schema";
import { requireUser } from "../middlewares/require.user";
import { authorized } from "../middlewares/authorized";

const userRoutes = express.Router();

userRoutes
  .route("/me")
  .get(requireUser, meHandler)
  .put(requireUser, validator(updateUserSchema), updateMeHandler);

userRoutes
  .route("/")
  .post(validator(createUserSchema), createUserHandler)
  .get(requireUser, authorized, getAllUsersHandler);

userRoutes.route("/auth").post(validator(loginUserSchema), loginUserHandler);
userRoutes.route("/logout").get(requireUser, logoutHandler);
userRoutes
  .route("/:id")
  .delete(
    requireUser,
    authorized,
    validator(userParamsSchema),
    deleteUserHandler
  )
  .get(requireUser, authorized, validator(userParamsSchema), getUserByIdHandler)
  .put(
    requireUser,
    authorized,
    validator(userParamsSchema),
    validator(updateUserSchema),
    updateUserHandler
  );

export default userRoutes;
