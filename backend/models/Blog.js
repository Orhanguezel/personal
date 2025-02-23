import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: {
    name: String,
    profile_image: String,
  },
  comment: String,
  date: { type: Date, default: Date.now },
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: {
    name: String,
    profile_image: String,
    bio: String,
    social: {
      linkedin: String,
      github: String,
    },
  },
  summary: { type: String, required: true },
  content: [
    {
      section_title: String,
      paragraph: String,
    },
  ],
  cover_image: String,
  additional_images: [String],
  published_at: { type: Date, default: Date.now },
  tags: [String],
  comments: [CommentSchema],
});

export default mongoose.model("Blog", BlogSchema);
