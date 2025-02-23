import express from "express";
import {
  getProjects,
  getProjectById,  // 🔥 Yeni: Tek proje getir
  addProject,
  updateProject, // 🔥 Yeni: Projeyi güncelle
  deleteProject
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js"; // 🔥 Middleware'i ekledik

const router = express.Router();

router.route("/")
  .get(getProjects)        // 🔥 Tüm projeleri listele (herkes görebilir)
  .post(protect, addProject); // 🔥 Yalnızca giriş yapan kullanıcı ekleyebilir

router.route("/:id")
  .get(getProjectById)  // 🔥 Yeni: Tek proje getir
  .put(protect, updateProject) // 🔥 Yeni: Güncelleme işlemi (yetkilendirme var)
  .delete(protect, deleteProject); // 🔥 Silme işlemi (yetkilendirme var)

export default router;

