import { NextFunction, Request, Response } from "express";

export function error(
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  res.send("Something went wrong");
}
