import swaggerAutogen from "swagger-autogen";

import { version } from "../package.json" with { type: "json" };

const PORT = process.env["PORT"] || 3000;
const PRODUCTION = process.env["NODE_ENV"] === "production";
const BASE_URL = PRODUCTION ? process.env["BASE_URL"] : `localhost:${PORT}`;

const outputFile = "./openapi.json";
const routes = ["./routes/index.route"];
const doc = {
  info: {
    title: "CSE341 API",
    description: "A simple API for the CSE341 course",
    version: version,
  },
  host: BASE_URL,
  schemes: PRODUCTION ? ["https"] : ["http", "https"],
  components: {
    securitySchemes: {
      auth0Session: {
        type: "apiKey",
        in: "cookie",
        name: "appSession",
        description: "Created by the server-side Auth0 login flow.",
      },
    },
  },
};

const generateSwagger = swaggerAutogen({ openapi: "3.2.0" });
generateSwagger(outputFile, routes, doc);
