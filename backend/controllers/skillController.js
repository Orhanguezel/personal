import Skill from "../models/Skill.js";

// ✅ Tüm Skill'leri Getir
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Yeni Skill Ekle
export const addSkill = async (req, res) => {
  const { category, name, image } = req.body;
  try {
    const newSkill = new Skill({ category, name, image });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: "Error adding skill", error });
  }
};

// ✅ Tekil Skill Getir
export const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skill", error });
  }
};

// ✅ Skill Güncelle
export const updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: "Error updating skill", error });
  }
};

// ✅ Skill Sil
export const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill", error });
  }
};
