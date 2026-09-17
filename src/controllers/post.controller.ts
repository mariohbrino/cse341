import type { Request, Response } from "express";
import { z } from "zod";

import type { PostData } from "@/models/post.model";
import { createPost, deletePost, findPostById, getAllPosts, updatePost } from "@/models/post.model";

class PostController {
  createSchema = z.object({
    body: z.object({
      title: z.string().trim().nonempty("Title cannot be empty"),
      content: z.string().trim().nonempty("Content cannot be empty"),
      status: z.enum(["draft", "published", "archived"]).default("draft"),
    }) satisfies z.ZodType<Omit<PostData, "slug">>,
  });

  index = async (_request: Request, response: Response): Promise<Response> => {
    response.setHeader("Content-Type", "application/json");
    try {
      const posts = await getAllPosts();

      return response.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while fetching contacts." });
    }
  };

  show = async (request: Request, response: Response): Promise<Response> => {
    response.setHeader("Content-Type", "application/json");
    try {
      const { id } = request.params;
      const postId = typeof id === "string" ? id.trim() : undefined;

      if (!postId) {
        return response.status(400).json({ message: "Post ID is required." });
      }
      const post = await findPostById(postId);

      if (!post) {
        return response.status(404).json({ message: "Cannot find post." });
      }
      return response.status(200).json(post);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while fetching the post." });
    }
  };

  store = async (request: Request, response: Response): Promise<Response> => {
    response.setHeader("Content-Type", "application/json");
    try {
      const postData: PostData = request.body;
      postData.slug = postData.title.toLowerCase().replace(/\s+/g, "-");
      const createdPost = await createPost(postData);
      return response.status(201).json(createdPost);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while creating the post." });
    }
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    response.setHeader("Content-Type", "application/json");

    try {
      const { id } = request.params;
      const postId = typeof id === "string" ? id.trim() : undefined;

      if (!postId) {
        return response.status(400).json({ message: "Post ID is required." });
      }

      const post = await findPostById(postId);

      if (!post) {
        return response.status(404).json({ message: "Cannot update post, not found." });
      }

      const updatedData: Partial<PostData> = request.body;
      const postUpdated = await updatePost(postId, updatedData);

      return response.status(200).json(postUpdated);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while updating the post." });
    }
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    response.setHeader("Content-Type", "application/json");
    try {
      const { id } = request.params;
      const postId = typeof id === "string" ? id.trim() : undefined;

      if (!postId) {
        return response.status(400).json({ message: "Post ID is required." });
      }

      const post = await findPostById(postId);

      if (!post) {
        return response.status(404).json({ message: "Cannot delete post, not found." });
      }

      await deletePost(postId);

      return response.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while deleting the post." });
    }
  };
}

export const postController = new PostController();
