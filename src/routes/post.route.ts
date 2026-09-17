import type { Request, Response } from "express";
import { Router } from "express";

import { postController } from "@/controllers/post.controller";
import { validateMiddleware } from "@/middlewares/validate.middleware";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Post']
   * #swagger.description = 'Retrieve a list of all posts.'
   * #swagger.responses[200] = {
      description: 'List of posts retrieved successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "Posts retrieved successfully" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while fetching posts" } } } }
    }
   */
  return postController.index(request, response);
});

router.post("/", validateMiddleware(postController.createSchema), (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Post']
   * #swagger.description = 'Create a new post.'
   * #swagger.responses[201] = {
      description: 'Post created successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "Post created successfully" } } } }
    }
    * #swagger.requestBody = {
      description: 'Post creation payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'content', 'status'],
            properties: {
              title: {
                type: 'string',
                example: 'My First Post'
              },
              content: {
                type: 'string',
                example: 'This is the content of my first post.'
              },
              status: {
                type: 'string',
                enum: ['draft', 'published', 'archived'],
                example: 'draft'
              }
            }
          }
        }
      }
    }
    * #swagger.responses[201] = {
      description: 'Successful post creation response',
      content: { "application/json": { schema: { type: "object", example: { message: "Post created successfully" } } } }
    }
    * #swagger.responses[400] = {
      description: 'Bad request - Invalid input data.',
      content: { 
        "application/json": { 
          schema: { 
            type: "object" 
          }, 
          examples: {
            missingPostId: { value: { message: "Post ID is required." } },
            invalidPayload: { value: { message: "Invalid request payload" } }
          } 
        } 
      }
    }
    * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while creating the post" } } } }
    }
   */
  return postController.store(request, response);
});

router.get("/:id", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Post']
   * #swagger.description = 'Retrieve a single post by ID.'
   * #swagger.responses[200] = {
      description: 'Post retrieved successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "Post retrieved successfully" } } } }
    }
   * #swagger.responses[400] = {
      description: 'Bad request.',
      content: { "application/json": { schema: { type: "object", example: { message: "Post ID is required." } } } }
    }
   * #swagger.responses[404] = {
      description: 'Not found response',
      content: { "application/json": { schema: { type: "object", example: { message: "No post found" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while retrieving the post" } } } }
    }
   */
  return postController.show(request, response);
});

router.put("/:id", validateMiddleware(postController.createSchema), (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Post']
   * #swagger.description = 'Update an existing post by ID.'
   * #swagger.requestBody = {
      description: 'Post update payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'content', 'status'],
            properties: {
              title: {
                type: 'string',
                example: 'My First Post'
              },
              content: {
                type: 'string',
                example: 'This is the content of my first post.'
              },
              status: {
                type: 'string',
                enum: ['draft', 'published', 'archived'],
                example: 'draft'
              }
            }
          }
        }
      }
    }
   * #swagger.responses[200] = {
      description: 'Post updated successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "Post updated successfully" } } } }
    }
   * #swagger.responses[400] = {
      description: 'Bad request - Invalid post data.',
      content: { 
        "application/json": { 
          schema: { 
            type: "object" 
          }, 
          examples: {
            missingPostId: { value: { message: "Post ID is required." } },
            invalidPayload: { value: { message: "Invalid request payload" } }
          } 
        } 
      }
    }
   * #swagger.responses[404] = {
      description: 'Post not found.',
      content: { "application/json": { schema: { type: "object", example: { message: "Post not found" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while updating the post" } } } }
    }
   */
  return postController.update(request, response);
});

router.delete("/:id", (request: Request, response: Response) => {
  /**
   * #swagger.tags = ['Post']
   * #swagger.description = 'Delete a post by ID.'
   * #swagger.responses[200] = {
      description: 'Post deleted successfully.',
      content: { "application/json": { schema: { type: "object", example: { message: "Post deleted successfully" } } } }
    }
   * #swagger.responses[400] = {
      description: 'Bad request.',
      content: { "application/json": { schema: { type: "object", example: { message: "Post ID is required." } } } }
    }
   * #swagger.responses[404] = {
      description: 'Post not found.',
      content: { "application/json": { schema: { type: "object", example: { message: "Post not found" } } } }
    }
   * #swagger.responses[500] = {
      description: 'Internal server error.',
      content: { "application/json": { schema: { type: "object", example: { message: "An error occurred while deleting the post" } } } }
    }
   */
  return postController.delete(request, response);
});

export { router as postRouter };
