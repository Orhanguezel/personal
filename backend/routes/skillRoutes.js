import express from "express";
import {
  getAllSkills,
  addSkill,
  getSkillById,
  updateSkill,
  deleteSkill
} from "../controllers/skillController.js";

const router = express.Router();

router.route("/").get(getAllSkills).post(addSkill);
router.route("/:id").get(getSkillById).put(updateSkill).delete(deleteSkill);

export default router;
