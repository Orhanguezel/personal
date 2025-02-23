import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Örn: "Frontend Development"
  name: { type: String, required: true }, // Örn: "React.js"
  image: { type: String, required: true } // Örn: "/assets/react.png"
});

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
