import { NextFunction, Request, Response } from "express";
import { findUser } from "../services/user.service";

export const authorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = res.locals.user;
  const user = await findUser(id);
  if (!user) {
    return res.status(401).json({ message: "You need to be logged in" });
  }
  if (user.isAdmin) {
    return next();
  }
  return res.status(403).json({
    message: "only admin can do this",
  });
};
