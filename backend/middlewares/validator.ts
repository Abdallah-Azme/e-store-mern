import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validator =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  };
