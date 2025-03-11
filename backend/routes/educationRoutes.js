import express from "express";
import { getEducation, addEducation } from "../controllers/educationController.js";

const router = express.Router();

router.route("/").get(getEducation).post(addEducation);

export default router;
