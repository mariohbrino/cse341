import { databaseService } from "@/services/database.service";

import { app } from "@/app";

const NODE_ENV = process.env["NODE_ENV"]?.toLowerCase() || "production";
const APP_PORT = process.env["APP_PORT"] || 3081;

// Start the server and connect to the database
app.listen(APP_PORT, async () => {
  try {
    await databaseService.connect();
    console.log(`Server is running at http://localhost:${APP_PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
