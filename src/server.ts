import express from "express";

import { router } from "@/routes/index.route";
import { databaseService } from "@/services/database.service";
import { errorHandlerMiddleware, handleNotFoundMiddleware } from "./middlewares/error.middleware";

const NODE_ENV = process.env["NODE_ENV"]?.toLowerCase() || "production";
const PORT = process.env["PORT"] || 3000;

const app = express();

app.use(express.json());

app.use(router);

app.use(handleNotFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, async () => {
  try {
    await databaseService.connect();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
