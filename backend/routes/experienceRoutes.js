import express from "express";
import { getExperience, addExperience } from "../controllers/experienceController.js";

const router = express.Router();

router.route("/").get(getExperience).post(addExperience);

export default router;
