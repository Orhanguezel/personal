import express from "express";
import About from "../models/About.js";

const router = express.Router();

// Get About Info
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about info", error });
  }
});

// Create or Update About Info
router.post("/", async (req, res) => {
  try {
    const { name, bio, image } = req.body;
    let about = await About.findOne();
    if (about) {
      about.name = name;
      about.bio = bio;
      about.image = image;
    } else {
      about = new About({ name, bio, image });
    }
    await about.save();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Error updating about info", error });
  }
});

export default router;
