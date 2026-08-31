import express, { type Request, type Response } from "express";

const NODE_ENV = process.env["NODE_ENV"]?.toLowerCase() || "production";
const PORT = process.env["PORT"] || 3000;

const app = express();

app.get("/", (_request: Request, response: Response) => {
  response.send("Hello, World!");
});

app.listen(PORT, async () => {
  try {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
