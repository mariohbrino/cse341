import { Router } from "express";

import { contactController } from "@/controllers/contact.controller";
import { validateMiddleware } from "@/middlewares/validate.middleware";

const router = Router();

router.get("/", contactController.index);
router.get("/:id", contactController.show);
router.post("/", validateMiddleware(contactController.createSchema), contactController.store);
router.post("/:id/update", contactController.update);
router.post("/:id/delete", contactController.delete);

export { router as contactRoutes };
