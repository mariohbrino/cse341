import express from "express";

import { homeController } from "@/controllers/home.controller";
import { professionalController } from "@/controllers/professional.controller";
import { contactRoutes } from "@/routes/contacts.route";

const router = express.Router();

router.get("/", homeController.index);

// Professional
router.get("/professional", professionalController.index);

// Contacts
router.use("/contacts", contactRoutes);

export { router };
