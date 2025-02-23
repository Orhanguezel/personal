import Project from "../models/Project.js";
import winston from "winston";

// 📌 Tüm projeleri getir
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Projeleri getirirken hata oluştu." });
  }
};

// 📌 Yeni proje ekle
export const addProject = async (req, res) => {
  try {
    const { title, description, link, image } = req.body;
    const newProject = await Project.create({ title, description, link, image });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Proje eklerken hata oluştu." });
  }
};

// 📌 Projeyi sil
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ message: "Proje başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: "Projeyi silerken hata oluştu." });
  }
};
