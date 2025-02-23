import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true } // Profil fotoğrafı için URL
});

export default mongoose.model("About", AboutSchema);
