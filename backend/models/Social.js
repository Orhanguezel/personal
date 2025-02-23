import mongoose from "mongoose";

const SocialMediaSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  link: { type: String, required: true },
  icon: { type: String } // Sosyal medya ikonu
});

export default mongoose.model("SocialMedia", SocialMediaSchema);
