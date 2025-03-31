import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidator =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).json(
          error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
          }))
        );
      }
      res.sendStatus(500).json({
        message: "Internal server error",
      });
    }
  };
