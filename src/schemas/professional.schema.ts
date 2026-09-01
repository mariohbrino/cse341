import { Schema } from "mongoose";

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

export { ProfessionalSchema };
