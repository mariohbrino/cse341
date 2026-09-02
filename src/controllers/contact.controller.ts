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
    const contacts = await getAllContacts();

    response.setHeader("Content-Type", "application/json");
    if (!contacts) {
      return response.status(404).json({ message: "No contacts found." });
    }

    return response.status(200).json(contacts);
  };

  show = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const contact = await findContactById(id as string);

    response.setHeader("Content-Type", "application/json");
    if (!contact) {
      return response.status(404).json({ message: "Cannot find contact." });
    }

    return response.status(200).json(contact);
  };

  store = async (request: Request, response: Response): Promise<Response> => {
    const contactData: ContactData = request.body;
    const createdContact = await createContact(contactData);
    return response.status(201).json(createdContact);
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const contact = await findContactById(id as string);

    response.setHeader("Content-Type", "application/json");
    if (!contact) {
      return response.status(404).json({ message: "Cannot update contact, not found." });
    }

    const updatedData: Partial<ContactData> = request.body;
    const contactUpdated = await updateContact(id as string, updatedData);

    return response.status(200).json(contactUpdated);
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const contact = await findContactById(id as string);

    response.setHeader("Content-Type", "application/json");
    if (!contact) {
      return response.status(404).json({ message: "Cannot delete contact, not found." });
    }

    await deleteContact(id as string);

    return response.status(200).json({ message: "Contact deleted successfully" });
  };
}

export const contactController = new ContactController();
