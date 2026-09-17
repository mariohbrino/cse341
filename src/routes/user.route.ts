import type { Request, Response } from "express";
import { Router } from "express";

import { userController } from "@/controllers/user.controller";
import { validateMiddleware } from "@/middlewares/validate.middleware";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Retrieve a list of all users.'
   * #swagger.responses[200] = {
      description: 'List of users retrieved successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "Users retrieved successfully" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while fetching users" } } } }
    }
   */
  return userController.index(request, response);
});

router.post("/", validateMiddleware(userController.createSchema), (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Create a new user.'
   * #swagger.responses[201] = {
      description: 'User created successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "User created successfully" } } } }
    }
    * #swagger.requestBody = {
      description: 'User creation payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['firstName', 'lastName', 'email'],
            properties: {
              firstName: {
                type: 'string',
                example: 'John'
              },
              lastName: {
                type: 'string',
                example: 'Doe'
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'john.doe@example.com'
              }
            }
          }
        }
      }
    }
    * #swagger.responses[201] = {
      description: 'Successful user creation response',
      content: { "application/json": { schema: { type: "object", example: { message: "User created successfully" } } } }
    }
    * #swagger.responses[400] = {
      description: 'Bad request - Invalid input data.',
      content: { 
        "application/json": { 
          schema: { 
            type: "object" 
          }, 
          examples: {
            missingUserId: { value: { message: "User ID is required." } },
            invalidPayload: { value: { message: "Invalid request payload" } }
          } 
        } 
      }
    }
    * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while creating the user" } } } }
    }
   */
  return userController.create(request, response);
});

router.get("/:id", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Retrieve a single user by ID.'
   * #swagger.responses[200] = {
      description: 'User retrieved successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "User retrieved successfully" } } } }
    }
   * #swagger.responses[400] = {
      description: 'Bad request.',
      content: { "application/json": { schema: { type: "object", example: { message: "User ID is required." } } } }
    }
   * #swagger.responses[404] = {
      description: 'Not found response',
      content: { "application/json": { schema: { type: "object", example: { message: "No user found" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while retrieving the user" } } } }
    }
   */
  return userController.show(request, response);
});

router.put("/:id", validateMiddleware(userController.createSchema), (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Update an existing user by ID.'
   * #swagger.requestBody = {
      description: 'User update payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['firstName', 'lastName', 'email'],
            properties: {
              firstName: {
                type: 'string',
                example: 'John'
              },
              lastName: {
                type: 'string',
                example: 'Doe'
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'john.doe@example.com'
              }
            }
          }
        }
      }
    }
   * #swagger.responses[200] = {
      description: 'User updated successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "User updated successfully" } } } }
    }
   * #swagger.responses[400] = {
      description: 'Bad request - Invalid input data.',
      content: { 
        "application/json": { 
          schema: { 
            type: "object" 
          }, 
          examples: {
            missingUserId: { value: { message: "User ID is required." } },
            invalidPayload: { value: { message: "Invalid request payload" } }
          } 
        } 
      }
    }
   * #swagger.responses[404] = {
      description: 'User not found.',
      content: { "application/json": { schema: { type: "object", example: { message: "User not found" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while updating the user" } } } }
    }
   */
  return userController.update(request, response);
});

router.delete("/:id", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Delete a user by ID.'
   * #swagger.responses[200] = {
      description: 'User deleted successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "User deleted successfully" } } } }
    }
   * #swagger.responses[400] = {
      description: 'Bad request.',
      content: { "application/json": { schema: { type: "object", example: { message: "User ID is required." } } } }
    }
   * #swagger.responses[404] = {
      description: 'User not found.',
      content: { "application/json": { schema: { type: "object", example: { message: "User not found" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while deleting the user" } } } }
    }
   */
  return userController.delete(request, response);
});

export { router as userRouter };
