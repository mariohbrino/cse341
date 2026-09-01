import { Router } from "express";

import { contactController } from "@/controllers/contact.controller";
import { validateMiddleware } from "@/middlewares/validate.middleware";

const router = Router();

router.get("/", contactController.index);
router.get("/:id", contactController.show);
router.post("/", validateMiddleware(contactController.createSchema), contactController.store);
router.put("/:id/update", contactController.update);
router.delete("/:id/delete", contactController.delete);

export { router as contactRoutes };
