import type { Request, Response } from "express";
import { z } from "zod";

import type { ContactData } from "@/models/contact.model";
import { createContact, deleteContact, findContactById, getAllContacts, updateContact } from "@/models/contact.model";

class ContactController {
  createSchema = z.object({
    body: z.object({
      firstName: z.string().nonempty("First name cannot be empty"),
      lastName: z.string().nonempty("Last name cannot be empty"),
      email: z.email().nonempty("Email cannot be empty"),
      favoriteColor: z.string().nonempty("Favorite color cannot be empty"),
      birthday: z.coerce.date(),
    }) satisfies z.ZodType<ContactData>,
  });

  index = async (_request: Request, response: Response): Promise<Response> => {
    try {
      const contacts = await getAllContacts();

      return response.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while fetching contacts." });
    }
  };

  show = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { id } = request.params;
      const contactId = typeof id === "string" ? id.trim() : undefined;

      if (!contactId) {
        return response.status(400).json({ message: "Contact ID is required." });
      }
      const contact = await findContactById(contactId);

      if (!contact) {
        return response.status(404).json({ message: "Cannot find contact." });
      }
      return response.status(200).json(contact);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while fetching the contact." });
    }
  };

  store = async (request: Request, response: Response): Promise<Response> => {
    try {
      const contactData: ContactData = request.body;
      const createdContact = await createContact(contactData);
      return response.status(201).json(createdContact);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while creating the contact." });
    }
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { id } = request.params;
      const contactId = typeof id === "string" ? id.trim() : undefined;

      if (!contactId) {
        return response.status(400).json({ message: "Contact ID is required." });
      }

      const contact = await findContactById(contactId);

      if (!contact) {
        return response.status(404).json({ message: "Cannot update contact, not found." });
      }

      const updatedData: Partial<ContactData> = request.body;
      const contactUpdated = await updateContact(contactId, updatedData);

      return response.status(200).json(contactUpdated);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while updating the contact." });
    }
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { id } = request.params;
      const contactId = typeof id === "string" ? id.trim() : undefined;

      if (!contactId) {
        return response.status(400).json({ message: "Contact ID is required." });
      }

      const contact = await findContactById(contactId);

      if (!contact) {
        return response.status(404).json({ message: "Cannot delete contact, not found." });
      }

      await deleteContact(contactId);

      return response.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while deleting the contact." });
    }
  };
}

export const contactController = new ContactController();
