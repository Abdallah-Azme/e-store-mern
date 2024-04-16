import { Query } from "mongoose";
import { User } from "../modles/user.model";
import { UserType } from "../schema/user.schema";

export const createUser = ({ username, email, password }: UserType) => {
  return User.create({ username, email, password });
};

export const findUserByEmail = (email: string) => {
  return User.findOne({ email });
};
export const findUserById = (id: string) => {
  return User.findById(id);
};

export const findUser = ({ query }: any) => {
  return User.findOne({ query });
};

export const getAllUsers = () => {
  return User.find({});
};

export const findUserByIdAndDelete = (id: string) => {
  return User.findByIdAndDelete(id);
};
