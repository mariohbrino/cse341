import type { Request, Response } from "express";

import { findProfessionalByName } from "@/models/professional.model";

class ProfessionalController {
  index = async (_request: Request, response: Response) => {
    const professional = await findProfessionalByName("John Doe");

    response.setHeader("Content-Type", "application/json");

    if (!professional) {
      response.status(404).json({ message: "Professional not found" });
      return;
    }

    response.status(200).json(professional);
  };
}

export const professionalController = new ProfessionalController();
