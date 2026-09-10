import express from "express";

import { router } from "@/routes/index.route";
import { errorHandlerMiddleware, handleNotFoundMiddleware } from "./middlewares/error.middleware";

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Register the main router
app.use(router);

// Handle 404 and other errors
app.use(handleNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export { app };
