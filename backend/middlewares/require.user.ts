import { NextFunction, Request, Response } from "express";
import { findUser } from "../services/user.service";

export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user) {
    const user = await findUser({ _id: res.locals.user });
    if (user) {
      res.locals.user = user;
      return next();
    }
  }
  return res.status(404).json({ message: "There is no user" });
};
