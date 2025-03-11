import Experience from "../models/Experience.js";

export const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experience", error });
  }
}

export const addExperience = async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();
    res.json(newExperience);
  } catch (error) {
    res.status(500).json({ message: "Error adding experience", error });
  }
}
