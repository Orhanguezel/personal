import express from "express";
import About from "../models/About.js";

const router = express.Router();

// ✅ **Hakkımda Bilgisini Seçilen Dile Göre Getir**
router.get("/:lang", async (req, res) => {
  try {
    const lang = req.params.lang;
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: "About info not found" });

    // Eğer istenen dil yoksa fallback olarak İngilizce'yi döndür
    const bio = about.bio[lang] || about.bio["en"] || "No bio available.";

    res.json({
      name: about.name,
      bio: bio,
      image: about.image,
    });
  } catch (error) {
    console.error("❌ Backend Error:", error);
    res.status(500).json({ message: "Error fetching about info", error });
  }
});




// ✅ **Hakkımda Bilgisini Güncelle**
router.post("/", async (req, res) => {
  try {
    const { name, bio, image } = req.body;

    // ✅ **Bio'nun bir nesne olup olmadığını kontrol et**
    if (!bio || typeof bio !== "object") {
      return res.status(400).json({ message: "Bio must be an object with multiple languages." });
    }

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
