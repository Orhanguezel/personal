import express from "express";
import { getProjects, addProject, deleteProject } from "../controllers/projectController.js";
import protect from "../middleware/authMiddleware.js"; // 🔥 Middleware'i burada kullanacağız

const router = express.Router();

router.route("/")
  .get(getProjects)        // 🔥 Projeleri herkes görebilir
  .post(protect, addProject); // 🔥 Sadece giriş yapan kullanıcı proje ekleyebilir

router.route("/:id")
  .delete(protect, deleteProject); // 🔥 Sadece giriş yapan kullanıcı silebilir

export default router;
