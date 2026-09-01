import express from "express";

import { homeController } from "@/controllers/home.controller";
import { professionalController } from "@/controllers/professional.controller";

const router = express.Router();

router.get("/", homeController.index);
router.get("/professional", professionalController.index);

export { router };
