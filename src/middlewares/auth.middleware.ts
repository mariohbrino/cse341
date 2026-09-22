import { auth } from "express-openid-connect";

const PORT = process.env["PORT"] || 3000;
const PRODUCTION = process.env["NODE_ENV"] === "production";
const SECRET = process.env["SECRET"];
const BASE_URL = PRODUCTION ? `https://${process.env["BASE_URL"]}` : `http://localhost:${PORT}`;
const CLIENT_ID = process.env["CLIENT_ID"];
const ISSUER_BASE_URL = process.env["ISSUER_BASE_URL"];

export const authMiddleware = auth({
  authRequired: false,
  auth0Logout: true,
  secret: SECRET,
  baseURL: BASE_URL,
  clientID: CLIENT_ID,
  issuerBaseURL: ISSUER_BASE_URL,
});
