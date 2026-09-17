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
    response.setHeader("Content-Type", "application/json");
    try {
      const contacts = await getAllContacts();

      if (contacts.length === 0) {
        return response.status(204).json({ message: "No contacts found" });
      }

      return response.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while fetching contacts." });
    }
  };

  show = async (request: Request, response: Response): Promise<Response> => {
    response.setHeader("Content-Type", "application/json");
    try {
      const { id } = request.params;
      const contact = await findContactById(id as string);

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
    response.setHeader("Content-Type", "application/json");
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
    response.setHeader("Content-Type", "application/json");

    try {
      const { id } = request.params;
      const contact = await findContactById(id as string);

      if (!contact) {
        return response.status(404).json({ message: "Cannot update contact, not found." });
      }

      const updatedData: Partial<ContactData> = request.body;
      const contactUpdated = await updateContact(id as string, updatedData);

      return response.status(200).json(contactUpdated);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while updating the contact." });
    }
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    response.setHeader("Content-Type", "application/json");
    try {
      const { id } = request.params;
      const contact = await findContactById(id as string);

      if (!contact) {
        return response.status(404).json({ message: "Cannot delete contact, not found." });
      }

      await deleteContact(id as string);

      return response.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "An error occurred while deleting the contact." });
    }
  };
}

export const contactController = new ContactController();
