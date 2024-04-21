import { NextFunction, Request, Response } from "express";
import { findUser, findUserById } from "../services/user.service";

export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.decoded) {
    const user = await findUserById(res.locals.decoded.id);
    if (user) {
      res.locals.user = user;
      return next();
    }
  }
  return res.status(404).json({ message: "There is no user" });
};
