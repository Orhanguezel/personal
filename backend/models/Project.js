import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  image: { 
    type: String, 
    default: "https://www.furkansaglam.com/wp-content/uploads/2019/10/wordpress-te-yuklediginiz-resimlerin-url-lerini-alma.png"
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true }, // 🔥 JSON formatına id eklemek için
  toObject: { virtuals: true }
});

// `_id` değerini `id` olarak döndürelim
projectSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
