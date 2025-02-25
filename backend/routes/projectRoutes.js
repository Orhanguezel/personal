import express from "express";
import {
  getProjects,
  getProjectById,
  getProjectsByLanguage,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 **Dil bazlı projeleri getir**
router.get("/language/:lang", getProjectsByLanguage);

// 📌 **Tek proje getir (dile duyarlı)**
router.get("/:id/:lang", getProjectById);

// 📌 **Tüm projeleri getir & yeni proje ekle**
router.route("/")
  .get(getProjects)  
  .post(protect, addProject);

// 📌 **Projeyi Güncelle / Sil (ID bazlı)**
router.route("/:id")
  .put(protect, updateProject) 
  .delete(protect, deleteProject);

export default router;
