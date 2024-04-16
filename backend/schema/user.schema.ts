import { isValidObjectId } from "mongoose";
import { z, object, string, boolean, isValid } from "zod";

const userPayload = {
  body: object({
    username: string({ required_error: "The username is required" }),
    password: string({ required_error: "The password is required" }).min(
      6,
      "Add 6 characters"
    ),
    email: string({ required_error: "The email is required" }).email(
      "Please enter your email address"
    ),
  }),
};

export const createUserSchema = object({
  ...userPayload,
});

export const loginUserSchema = object({
  body: object({
    password: string({ required_error: "The password is required" }).min(
      6,
      "Add 6 characters"
    ),
    email: string({ required_error: "The email is required" }).email(
      "Please enter your email address"
    ),
  }),
});
export const updateUserSchema = object({
  body: object({
    username: string({ required_error: "The username is required" }).optional(),
    email: string({ required_error: "The email is required" })
      .email("Please enter your email address")
      .optional(),
  }),
});
export const userParamsSchema = object({
  params: object({
    id: string({ required_error: "The id is required" }),
  }).refine((data) => isValidObjectId(data.id), {
    message: "Please enter a valid id",
  }),
});

export type UserType = z.infer<typeof userPayload.body>;
