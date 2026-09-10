import express from "express";

import { contactRoutes } from "@/routes/contacts.route";
import { docsRouter } from "@/routes/docs.route";
import { homeRoutes } from "@/routes/home.route";
import { professionalRoutes } from "@/routes/professional.route";

const router = express.Router();

router.use("/", homeRoutes);
router.use("/contacts", contactRoutes);
router.use("/professional", professionalRoutes);

router.use("/api-docs", docsRouter);

export { router };
