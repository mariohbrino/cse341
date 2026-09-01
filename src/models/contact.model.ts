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

const createContact = async (contactData: ContactData) => {
  const createdContact = await ContactModel.findOneAndUpdate(
    { email: contactData.email },
    { $setOnInsert: contactData },
    { returnDocument: "after", upsert: true },
  );
  console.log("Contact created:", createdContact);
  return createdContact;
};

const updateContact = async (id: string, updatedData: Partial<ContactData>) => {
  const updatedContact = await ContactModel.findByIdAndUpdate(id, updatedData, { returnDocument: "after" });
  if (!updatedContact) {
    throw new Error(`Contact with id ${id} not found.`);
  }
  console.log("Contact updated:", updatedContact);
  return updatedContact;
};

const deleteContact = async (id: string) => {
  const deletedContact = await ContactModel.findByIdAndDelete(id);
  if (!deletedContact) {
    throw new Error(`Contact with id ${id} not found.`);
  }
  console.log("Contact deleted:", deletedContact);
  return deletedContact;
};

export {
  ContactModel,
  createContact,
  deleteContact,
  findContactByEmail,
  findContactById,
  getAllContacts,
  updateContact,
};
export type { ContactData, ContactDocument };
