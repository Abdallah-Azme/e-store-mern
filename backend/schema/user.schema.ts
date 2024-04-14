import { object, string, boolean } from "zod";

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
