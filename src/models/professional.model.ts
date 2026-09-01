import type { InferSchemaType } from "mongoose";

import { ProfessionalSchema } from "@/schemas/professional.schema";
import { databaseService } from "@/services/database.service";

type ProfessionalData = InferSchemaType<typeof ProfessionalSchema>;
type ProfessionalDocument = InstanceType<typeof ProfessionalModel>;

const ProfessionalModel = databaseService.connection.model("Professional", ProfessionalSchema);

const findProfessionalByName = async (professionalName: string): Promise<ProfessionalDocument | null> => {
  const professional = await ProfessionalModel.findOne({ professionalName });
  return professional;
};

const createProfessional = async (professionalData: ProfessionalData) => {
  const professional = new ProfessionalModel(professionalData);
  const createdProfessional = await professional.save();
  console.log("Professional created:", createdProfessional);
  return createdProfessional;
};

export { createProfessional, findProfessionalByName, ProfessionalModel };
export type { ProfessionalData, ProfessionalDocument };
