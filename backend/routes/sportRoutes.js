import express from "express";
import Sport from "../models/Sport.js";

const router = express.Router();

// Get Sports
router.get("/", async (req, res) => {
  try {
    const sports = await Sport.find();
    res.json(sports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sports", error });
  }
});

// Add New Sport
router.post("/", async (req, res) => {
  try {
    const newSport = new Sport(req.body);
    await newSport.save();
    res.json(newSport);
  } catch (error) {
    res.status(500).json({ message: "Error adding sport", error });
  }
});

export default router;
