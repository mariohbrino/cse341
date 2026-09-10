import express from "express";

import { homeController } from "@/controllers/home.controller";

const router = express.Router();

router.get("/", (request: express.Request, response: express.Response) => {
  /**
   * #swagger.tags = ['Root']
   * #swagger.description = 'Get the home page'
   */
  return homeController.index(request, response);
});

export { router as homeRoutes };
