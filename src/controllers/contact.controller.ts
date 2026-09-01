import type { Request, Response } from "express";
import { z } from "zod";

import type { ContactData } from "@/models/contact.model";
import { createContact, deleteContact, findContactById, getAllContacts, updateContact } from "@/models/contact.model";

class ContactController {
  index = async (_request: Request, response: Response): Promise<Response> => {
    const contacts = await getAllContacts();

    response.setHeader("Content-Type", "application/json");
    return response.status(200).json(contacts);
  };

  show = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const contact = await findContactById(id as string);

    response.setHeader("Content-Type", "application/json");
    if (!contact) {
      return response.status(404).json({ message: "Contact not found" });
    }

    return response.status(200).json(contact);
  };

  createSchema = z.object({
    body: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.email(),
      favoriteColor: z.string(),
      birthday: z.coerce.date(),
    }) satisfies z.ZodType<ContactData>,
  });

  store = async (request: Request, response: Response): Promise<Response> => {
    const contactData: ContactData = request.body;
    const createdContact = await createContact(contactData);
    return response.status(201).json(createdContact);
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const updatedData: Partial<ContactData> = request.body;

    response.setHeader("Content-Type", "application/json");
    const contact = await updateContact(id as string, updatedData);
    if (!contact) {
      return response.status(404).json({ message: "Contact not found" });
    }

    return response.status(200).json(contact);
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    response.setHeader("Content-Type", "application/json");
    const contactDeleted = await deleteContact(id as string);
    if (!contactDeleted) {
      return response.status(404).json({ message: "Contact not found" });
    }

    return response.status(200).json({ message: "Contact deleted successfully" });
  };
}

export const contactController = new ContactController();
