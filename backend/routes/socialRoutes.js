import express from "express";
import Social from "../models/Social.js";

const router = express.Router();

// Tüm sosyal medya verilerini getir
router.get("/", async (req, res) => {
    try {
      const social = await Social.find();
      res.json(social);
    } catch (error) {
      res.status(500).json({ message: "Error fetching social data", error });
    }
  });

// Add New Social Media Entry
router.post("/", async (req, res) => {
  try {
    const newSocialMedia = new Social(req.body);
    await newSocialMedia.save();
    res.json(newSocialMedia);
  } catch (error) {
    res.status(500).json({ message: "Error adding social media", error });
  }
});

export default router;
