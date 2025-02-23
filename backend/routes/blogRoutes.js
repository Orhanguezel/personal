import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
} from "../controllers/blogController.js";

const router = express.Router();

// ✅ Bloglar için API Endpointleri
router.get("/", getAllBlogs); // Tüm blogları getir
router.get("/:id", getBlogById); // ID'ye göre blog getir
router.post("/", createBlog); // Yeni blog ekle
router.put("/:id", updateBlog); // Blog güncelle
router.delete("/:id", deleteBlog); // Blog sil
router.post("/:id/comments", addComment); // Bloga yorum ekle

export default router;
