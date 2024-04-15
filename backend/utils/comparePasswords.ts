import { compare } from "bcryptjs";

export const comparePasswords = (
  candidatePassword: string,
  password: string
) => {
  return compare(candidatePassword, password);
};
