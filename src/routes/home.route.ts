import type { Request, Response } from "express";
import express from "express";

import { homeController } from "@/controllers/home.controller";

const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Root']
   * #swagger.description = 'Get the home page'
   * * #swagger.responses[200] = {
      description: 'Successful home page retrieval response',
      content: { "application/json": { schema: { type: "object", example: { message: "Hello, World!" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error response',
      content: { "application/json": { schema: { type: "object", example: { error: "Internal Server Error" } } } }
    }
   */
  return homeController.index(request, response);
});

router.get("/invalid", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Root']
   * #swagger.description = 'Get the invalid route page'
   * #swagger.responses[500] = {
      description: 'Internal server error response',
      content: { "application/json": { schema: { type: "object", example: { error: "Something went wrong" } } } }
    }
   */
  return homeController.invalid(request, response);
});

export { router as homeRoutes };
