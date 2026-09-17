import express from "express";

import { professionalController } from "@/controllers/professional.controller";

const router = express.Router();

router.get("/professional", (request: express.Request, response: express.Response) => {
  /**
   * #swagger.ignore = true
   */
  return professionalController.index(request, response);
});

export { router as professionalRoutes };
