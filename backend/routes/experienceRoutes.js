import express from "express";
import Experience from "../models/Experience.js";

const router = express.Router();

// Get Experience
router.get("/", async (req, res) => {
  try {
    const experience = await Experience.find();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experience", error });
  }
});

// Add New Experience Entry
router.post("/", async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();
    res.json(newExperience);
  } catch (error) {
    res.status(500).json({ message: "Error adding experience", error });
  }
});

export default router;
