import type { InferSchemaType } from "mongoose";

import { PostSchema } from "@/schemas/post.schema";
import { databaseService } from "@/services/database.service";

export type PostData = InferSchemaType<typeof PostSchema>;
export type PostDocument = InstanceType<typeof PostModel>;

export const PostModel = databaseService.connection.model("Posts", PostSchema);

export const getAllPosts = async (): Promise<PostDocument[]> => {
  const posts = await PostModel.find();
  return posts;
};

export const findPostById = async (id: string): Promise<PostDocument | null> => {
  try {
    const post = await PostModel.findById(id);
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createPost = async (postData: PostData) => {
  try {
    const createdPost = await PostModel.findOneAndUpdate(
      { title: postData.title },
      { $setOnInsert: postData },
      { returnDocument: "after", upsert: true, runValidators: true },
    );
    console.log("Post created:", createdPost);
    return createdPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updatePost = async (id: string, updatedData: Partial<PostData>): Promise<PostDocument | null> => {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(id, updatedData, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedPost) {
      throw new Error(`Post with id ${id} not found.`);
    }
    console.log("Post updated:", updatedPost);
    return updatedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deletePost = async (id: string): Promise<PostDocument | null> => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (!deletedPost) {
      throw new Error(`Post with id ${id} not found.`);
    }
    console.log("Post deleted:", deletedPost);
    return deletedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};
