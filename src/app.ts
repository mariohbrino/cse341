import express from "express";

import { router } from "@/routes/index.route";
import { errorHandlerMiddleware, handleNotFoundMiddleware } from "./middlewares/error.middleware";
import { responseMiddleware } from "./middlewares/response.middleware";

// Create an instance of the Express application
const app = express();

// Apply middlewares
app.use(express.json());
app.use(authMiddleware);

// Register the main router
app.use(router);

// Handle 404 and other errors
app.use(handleNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export { app };
