import { Schema } from "mongoose";

export const PostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  status: { type: String, required: true, enum: ["draft", "published", "archived"], default: "draft" },
});
