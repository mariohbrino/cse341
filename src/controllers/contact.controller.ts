import type { Request, Response } from "express";

import { findContactById, getAllContacts } from "@/models/contact.model";

class ContactController {
  index = async (_request: Request, response: Response): Promise<Response> => {
    const contacts = await getAllContacts();
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
}

export const contactController = new ContactController();
