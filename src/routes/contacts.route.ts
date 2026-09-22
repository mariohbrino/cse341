import type { Request, Response } from "express";
import { Router } from "express";

import { contactController } from "@/controllers/contact.controller";
import { validateMiddleware } from "@/middlewares/validate.middleware";
import { requiresAuth } from "@/utils/auth.util";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Contacts']
   * #swagger.description = 'Get all contacts'
   * #swagger.responses[200] = {
      description: 'Successful contacts retrieval response',
      content: { "application/json": { schema: { type: "object", example: { message: "Contacts retrieved successfully" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error response',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while fetching contacts." } } } }
    }
   */
  return contactController.index(request, response);
});

router.post(
  "/",
  requiresAuth(),
  validateMiddleware(contactController.createSchema),
  (request: Request, response: Response) => {
    /**
   * #swagger.tags = ['Contacts']
   * #swagger.description = 'Create a new contact'
   * #swagger.security = [{ auth0Session: [] }]
   * #swagger.requestBody = {
      description: 'Contact creation payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
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
              },
              favoriteColor: {
                type: 'string',
                example: 'blue'
              },
              birthday: {
                type: 'string',
                format: 'date',
                example: '1990-01-01'
              }
            }
          }
        }
      }
    }
  * #swagger.responses[201] = {
      description: 'Successful contact creation response',
      content: { "application/json": { schema: { type: "object", example: { message: "Contact created successfully" } } } }
    }
  * #swagger.responses[400] = {
      description: 'Bad request - Invalid input data.',
      content: { 
        "application/json": { 
          schema: { 
            type: "object" 
          }, 
          examples: {
            missingContactId: { value: { message: "Contact ID is required." } },
            invalidPayload: { value: { message: "Invalid request payload" } }
          } 
        } 
      }
    }
  * #swagger.responses[500] = {
      description: 'Internal server error response',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while creating the contact." } } } }
    }
  */
    return contactController.store(request, response);
  },
);

router.get("/:id", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Contacts']
   * #swagger.description = 'Get a contact by ID'
   * #swagger.responses[200] = {
      description: 'Successful contact retrieval response',
      content: { "application/json": { schema: { type: "object", example: { message: "Contact retrieved successfully" } } } }
    }
   * #swagger.responses[400] = {
      description: 'Bad request.',
      content: { "application/json": { schema: { type: "object", example: { message: "Contact ID is required." } } } }
    }
   * #swagger.responses[404] = {
      description: 'Not found response',
      content: { "application/json": { schema: { type: "object", example: { message: "Contact not found" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error response',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while fetching the contact." } } } }
    }
   */
  return contactController.show(request, response);
});

router.put(
  "/:id",
  requiresAuth(),
  validateMiddleware(contactController.createSchema),
  (request: Request, response: Response) => {
    /**
   * #swagger.tags = ['Contacts']
   * #swagger.description = 'Update a contact by ID'
   * #swagger.security = [{ auth0Session: [] }]
   * #swagger.requestBody = {
      description: 'Contact update payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
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
              },
              favoriteColor: {
                type: 'string',
                example: 'blue'
              },
              birthday: {
                type: 'string',
                format: 'date',
                example: '1990-01-01'
              }
            }
          }
        }
      }
    }
   * #swagger.responses[200] = {
      description: 'Successful contact update response',
      content: { "application/json": { schema: { type: "object", example: { message: "Contact updated successfully" } } } }
    }
   * #swagger.responses[400] = {
      description: 'Bad request - Invalid input data.',
      content: { 
        "application/json": { 
          schema: { 
            type: "object" 
          }, 
          examples: {
            missingContactId: { value: { message: "Contact ID is required." } },
            invalidPayload: { value: { message: "Invalid request payload" } }
          } 
        } 
      }
    }
   * #swagger.responses[404] = {
      description: 'Not found response',
      content: { "application/json": { schema: { type: "object", example: { message: "Contact not found" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error response',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while updating the contact." } } } }
    }
   */
    return contactController.update(request, response);
  },
);

router.delete("/:id", requiresAuth(), (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Contacts']
   * #swagger.description = 'Delete a contact by ID'
   * #swagger.security = [{ auth0Session: [] }]
   * #swagger.responses[200] = {
      description: 'Successful contact deletion response',
      content: { "application/json": { schema: { type: "object", example: { message: "Contact deleted successfully" } } } }
    }
   * #swagger.responses[400] = {
      description: 'Bad request.',
      content: { "application/json": { schema: { type: "object", example: { message: "Contact ID is required." } } } }
    }
   * #swagger.responses[404] = {
      description: 'Not found response',
      content: { "application/json": { schema: { type: "object", example: { message: "Contact not found" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error response',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while deleting the contact." } } } }
    }
   */
  return contactController.delete(request, response);
});

export { router as contactRoutes };
