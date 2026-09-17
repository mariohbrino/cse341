import type { InferSchemaType } from "mongoose";

import { ContactSchema } from "@/schemas/contact.schema";
import { databaseService } from "@/services/database.service";

export type ContactData = InferSchemaType<typeof ContactSchema>;
export type ContactDocument = InstanceType<typeof ContactModel>;

export const ContactModel = databaseService.connection.model("Contact", ContactSchema);

export const getAllContacts = async (): Promise<ContactDocument[]> => {
  try {
    const contacts = await ContactModel.find();
    return contacts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findContactById = async (id: string): Promise<ContactDocument | null> => {
  try {
    const contact = await ContactModel.findById(id);
    return contact;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findContactByEmail = async (email: string): Promise<ContactDocument | null> => {
  try {
    const contact = await ContactModel.findOne({ email });
    return contact;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createContact = async (contactData: ContactData) => {
  try {
    const createdContact = await ContactModel.findOneAndUpdate(
      { email: contactData.email },
      { $setOnInsert: contactData },
      { returnDocument: "after", upsert: true, runValidators: true },
    );
    console.log("Contact created:", createdContact);
    return createdContact;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateContact = async (id: string, updatedData: Partial<ContactData>) => {
  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(id, updatedData, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedContact) {
      throw new Error(`Contact with id ${id} not found.`);
    }
    console.log("Contact updated:", updatedContact);
    return updatedContact;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteContact = async (id: string) => {
  try {
    const deletedContact = await ContactModel.findByIdAndDelete(id);
    if (!deletedContact) {
      throw new Error(`Contact with id ${id} not found.`);
    }
    console.log("Contact deleted:", deletedContact);
    return deletedContact;
  } catch (error) {
    console.error(error);
    return null;
  }
};
