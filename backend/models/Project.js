import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      tr: { type: String, required: true },
      en: { type: String, required: true },
      de: { type: String, required: true }
    },
    description: {
      tr: { type: String, required: true },
      en: { type: String, required: true },
      de: { type: String, required: true }
    },
    link: { type: String, required: true },
    image: { type: String },
    technologies: [{ type: String }], // Kullanılan teknolojiler
    features: {
      tr: [{ type: String }],
      en: [{ type: String }],
      de: [{ type: String }]
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
