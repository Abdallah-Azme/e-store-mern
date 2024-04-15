import { User } from "../modles/user.model";
import { UserType } from "../schema/user.schema";

export const createUser = ({ username, email, password }: UserType) => {
  return User.create({ username, email, password });
};

export const getUserByEmail = (email: string) => {
  return User.findOne({ email });
};

export const findUserByEmail = (email: string) => {
  return User.findOne({ email });
};
