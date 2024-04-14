import { Request, Response } from "express";

export function notFound(_: Request, res: Response) {
  res.send("This route does not exist");
}
