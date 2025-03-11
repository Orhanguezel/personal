import Social from "../models/Social.js";

export const getSocial = async (req, res) => {
  try {
    const social = await Social.find();
    res.json(social);
  } catch (error) {
    res.status(500).json({ message: "Error fetching social data", error });
  }
}

export const addSocial = async (req, res) => {
  try {
    const newSocialMedia = new Social(req.body);
    await newSocialMedia.save();
    res.json(newSocialMedia);
  } catch (error) {
    res.status(500).json({ message: "Error adding social media", error });
  }
}
