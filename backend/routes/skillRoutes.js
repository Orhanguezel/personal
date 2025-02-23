import express from "express";
import {
  getAllSkills,
  addSkill,
  getSkillById,
  updateSkill,
  deleteSkill
} from "../controllers/skillController.js";

const router = express.Router();

router.get("/", getAllSkills);
router.post("/", addSkill);
router.get("/:id", getSkillById);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

export default router;
