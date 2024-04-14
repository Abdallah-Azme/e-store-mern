import express from "express";
import { createUser } from "../controllers/user.controller";
import { validator } from "../middlewares/validator";
import { createUserSchema } from "../schema/user.schema";

const userRoutes = express.Router();

userRoutes.route("/").post(validator(createUserSchema), createUser);

export default userRoutes;
