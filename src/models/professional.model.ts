import type { InferSchemaType } from "mongoose";

import { ProfessionalSchema } from "@/schemas/professional.schema";
import { databaseService } from "@/services/database.service";

export type ProfessionalData = InferSchemaType<typeof ProfessionalSchema>;
export type ProfessionalDocument = InstanceType<typeof ProfessionalModel>;

export const ProfessionalModel = databaseService.connection.model("Professional", ProfessionalSchema);

export const findProfessionalByName = async (professionalName: string): Promise<ProfessionalDocument | null> => {
  const professional = await ProfessionalModel.findOne({ professionalName });
  return professional;
};

export const createProfessional = async (professionalData: ProfessionalData) => {
  const professional = new ProfessionalModel(professionalData);
  const createdProfessional = await professional.save();
  console.log("Professional created:", createdProfessional);
  return createdProfessional;
};
