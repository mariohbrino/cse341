import express from "express";

import { contactRoutes } from "@/routes/contacts.route";
import { docsRouter } from "@/routes/docs.route";
import { homeRoutes } from "@/routes/home.route";
import { postRouter } from "@/routes/post.route";
import { professionalRoutes } from "@/routes/professional.route";
import { requiresAuth } from "@/utils/auth.util";
import { userRouter } from "./user.route";

const router = express.Router();

router.use("/", homeRoutes);
router.use("/users", requiresAuth(), userRouter);
router.use("/posts", requiresAuth(), postRouter);
router.use("/contacts", contactRoutes);
router.use("/professional", professionalRoutes);

router.use("/api-docs", docsRouter);

export { router };
