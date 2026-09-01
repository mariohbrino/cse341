import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

const validateMiddleware =
  <T extends ZodType>(schema: T) =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: request.body,
        query: request.query,
        params: request.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error:", error.issues);
        return response.status(400).json({ errors: error.issues });
      }
      return response.status(500).json({ error: "Internal Server Error" });
    }
  };

export { validateMiddleware };
