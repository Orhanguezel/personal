import mongoose from "mongoose";

const SportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String } // Spor aktivitesi ile ilgili görsel
});

export default mongoose.model("Sport", SportSchema);
