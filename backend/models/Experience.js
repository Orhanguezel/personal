import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  image: { type: String } // Şirket logosu
});

export default mongoose.model("Experience", ExperienceSchema);
