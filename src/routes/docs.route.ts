import { apiReference } from "@scalar/express-api-reference";
import express from "express";

import openApiSpec from "@/openapi.json" with { type: "json" };

const router = express.Router();

router.use(
  "/",
  apiReference({
    content: openApiSpec,
    pageTitle: "CSE341 API Docs",
    theme: "default",
    layout: "modern",
    showSidebar: true,
    darkMode: true,
    agent: {
      disabled: true,
    },
    showDeveloperTools: "never",
  }),
);

export { router as docsRouter };
