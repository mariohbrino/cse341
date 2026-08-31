import { Schema, type InferSchemaType } from "mongoose";

import { databaseService } from "@/services/database.service";

const ProfessionalSchema = new Schema(
  {
    professionalName: { type: String, required: true, unique: true },
    nameLink: {
      firstName: { type: String, required: true },
      url: { type: String, required: true },
    },
    base64Image: { type: String, required: true },
    primaryDescription: { type: String, required: true },
    workDescription1: { type: String, required: true },
    workDescription2: { type: String, required: true },
    linkTitleText: { type: String, required: true },
    linkedInLink: {
      text: { type: String, required: true },
      link: { type: String, required: true },
    },
    githubLink: {
      text: { type: String, required: true },
      link: { type: String, required: true },
    },
  },
  { collection: "professional" },
);

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
