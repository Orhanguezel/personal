import Sport from "../models/Sport.js";

export const getSport = async (req, res) => {
  try {
    const sports = await Sport.find();
    res.json(sports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sports", error });
  }
}

export const addSport = async (req, res) => {
  try {
    const newSport = new Sport(req.body);
    await newSport.save();
    res.json(newSport);
  } catch (error) {
    res.status(500).json({ message: "Error adding sport", error });
  }
}

export const getSportById = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);
    res.json(sport);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sport", error });
  }
}

export const updateSport = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);
    sport.set(req.body);
    await sport.save();
    res.json(sport);
  } catch (error) {
    res.status(500).json({ message: "Error updating sport", error });
  }
}

export const deleteSport = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);
    await sport.remove();
    res.json({ message: "Sport deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sport", error });
  }
}
