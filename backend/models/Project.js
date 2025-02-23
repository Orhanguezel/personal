import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String },
  technologies: [{ type: String }],  // Yeni: Kullanılan teknolojiler
  features: [{ type: String }]  // Yeni: Öne çıkan özellikler
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;
