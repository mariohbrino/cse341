import { Schema } from "mongoose";

const ContactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favoriteColor: { type: String, required: true },
  birthday: { type: Date, required: true },
});

export { ContactSchema };
