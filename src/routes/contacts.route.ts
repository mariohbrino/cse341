import { Router } from "express";

import { contactController } from "@/controllers/contact.controller";
import { validateMiddleware } from "@/middlewares/validate.middleware";

const router = Router();

router.get("/", contactController.index);
router.get("/:id", contactController.show);
router.post("/", validateMiddleware(contactController.createSchema), contactController.store);
router.put("/:id", validateMiddleware(contactController.createSchema), contactController.update);
router.delete("/:id", contactController.delete);

export { router as contactRoutes };
