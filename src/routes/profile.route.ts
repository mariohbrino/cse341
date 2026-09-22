import type { Request, Response } from "express";
import { Router } from "express";

import { profileController } from "@/controllers/profile.controller";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Profile']
   * #swagger.description = 'Get the authenticated user profile'
   * #swagger.security = [{ auth0Session: [] }]
   * #swagger.responses[200] = {
      description: 'Authenticated user profile retrieved successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "Authenticated user profile retrieved successfully" } } } }
    }
   * #swagger.responses[401] = {
      description: 'Unauthorized - Authentication required.',
      content: { "application/json": { schema: { type: "object", example: { message: "Authentication required" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while fetching the authenticated user profile" } } } }
    }
   */
  return profileController.index(request, response);
});

export { router as profileRouter };
