import { type NextFunction, type Request, type Response } from "express";

type ErrorContext = {
  title: string;
  error: string;
  stack?: string;
};

type HttpError = Error & {
  status?: number;
};

/**
 * Handle 404 Not Found errors
 * @param request The incoming request object
 * @param _response The response object (not used)
 * @param next The next middleware function
 * @returns void
 */
const handleNotFoundMiddleware = (request: Request, _response: Response, next: NextFunction): void => {
  const err: HttpError = new Error(`Page Not Found: ${request.method} ${request.originalUrl}`);
  err.status = 404;
  return next(err);
};

/**
 * Handle errors
 * @param err The error object
 * @param request The incoming request object
 * @param response The response object
 * @param _next The next middleware function (not used)
 */
const errorHandlerMiddleware = (
  err: HttpError,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  void _next;

  // Determine status and template
  const status = err.status || 500;

  if (status === 404) {
    console.warn(err.message);
  } else {
    console.error("Error occurred:", err.message);
    console.error("Stack trace:", err.stack);
  }

  // Prepare data for the template
  const context: ErrorContext = {
    title: status === 404 ? "Page Not Found" : "Server Error",
    error: err.message,
  };

  if (process.env["NODE_ENV"] === "development") {
    context.stack = JSON.stringify(err.stack, null, 2);
  }

  // Send the appropriate error template as JSON
  return response.status(status).json({ context });
};

export { errorHandlerMiddleware, handleNotFoundMiddleware };
