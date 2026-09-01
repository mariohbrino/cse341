import type { InferSchemaType } from "mongoose";

import { ContactSchema } from "@/schemas/contact.schema";
import { databaseService } from "@/services/database.service";

type ContactData = InferSchemaType<typeof ContactSchema>;
type ContactDocument = InstanceType<typeof ContactModel>;

const ContactModel = databaseService.connection.model("Contact", ContactSchema);

const getAllContacts = async (): Promise<ContactDocument[]> => {
  const contacts = await ContactModel.find();
  return contacts;
};

const findContactById = async (id: string): Promise<ContactDocument | null> => {
  const contact = await ContactModel.findById(id);
  return contact;
};

const findContactByEmail = async (email: string): Promise<ContactDocument | null> => {
  const contact = await ContactModel.findOne({ email });
  return contact;
};

export { ContactModel, findContactByEmail, findContactById, getAllContacts };
export type { ContactData, ContactDocument };
