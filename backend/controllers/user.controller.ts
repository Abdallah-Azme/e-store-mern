import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  //   const user = await
});
