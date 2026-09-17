import { Schema } from "mongoose";

export const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, required: true, enum: ["active", "inactive"], default: "active" },
});
