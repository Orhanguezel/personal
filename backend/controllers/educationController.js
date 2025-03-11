import Education from "../models/Education.js";

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find();
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: "Error fetching education", error });
  }
}

export const addEducation = async (req, res) => {
  try {
    const newEducation = new Education(req.body);
    await newEducation.save();
    res.json(newEducation);
  } catch (error) {
    res.status(500).json({ message: "Error adding education", error });
  }
}
