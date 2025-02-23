import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import logger from "../config/logger.js";

const router = express.Router();

// 📌 Kullanıcı Giriş (Login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı MongoDB'den bul
    const user = await User.findOne({ email });
    if (!user) {
      logger.error("Giriş başarısız: Kullanıcı bulunamadı");
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    // Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.error("Giriş başarısız: Yanlış şifre");
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    logger.info(`Giriş başarılı: ${user.email}`);

    // Kullanıcı bilgilerini ve token'ı dön
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // Kullanıcının rolünü de gönder
      token: generateToken(user._id),
    });
  } catch (error) {
    logger.error(`Giriş yaparken hata oluştu: ${error.message}`);
    res.status(500).json({ message: "Sunucu hatası. Lütfen tekrar deneyin." });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // Rolü de ekledik!
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Giriş yaparken bir hata oluştu." });
  }
});

router.get("/profile", protect, getUserProfile); // Kullanıcı bilgileri için korumalı rota

export default router;
