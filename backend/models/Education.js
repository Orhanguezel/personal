import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  image: { type: String } // Okul logosu veya sembolü
});

export default mongoose.model("Education", EducationSchema);
