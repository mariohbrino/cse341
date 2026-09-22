import { Schema } from "mongoose";

export const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, required: true, enum: ["active", "inactive"], default: "active" },
  verifyToken: { type: String, required: false },
  verifiedEmail: { type: Boolean, required: true, default: false },
  role: { type: String, required: true, enum: ["user", "admin"], default: "user" },
});
