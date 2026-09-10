import { databaseService } from "@/services/database.service";

import { app } from "@/app";

const NODE_ENV = process.env["NODE_ENV"]?.toLowerCase() || "production";
const PORT = process.env["PORT"] || 3081;

// Start the server and connect to the database
app.listen(PORT, async () => {
  try {
    await databaseService.connect();
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
