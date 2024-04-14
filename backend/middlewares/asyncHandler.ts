import { NextFunction, Request, Response } from "express";

export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      res.status(500).json({ message: error.message });
    });
  };
