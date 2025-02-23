import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: {
    tr: { type: String, required: true },
    en: { type: String, required: true },
    de: { type: String, required: true },
  },
  image: { type: String, required: true },
});

export default mongoose.model("About", AboutSchema);
