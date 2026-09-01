import { Router } from "express";

import { contactController } from "@/controllers/contact.controller";

const router = Router();

router.get("/", contactController.index);
router.get("/:id", contactController.show);

export { router as contactRoutes };
