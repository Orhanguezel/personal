import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import logger from "../config/logger.js";

// 📌 **Kullanıcı Kayıt (Register)**
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, profileImage } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn(`🟡 Kullanıcı kayıt başarısız - E-posta zaten var: ${email}`);
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });
    }

    // ✅ Yeni kullanıcı oluştur
    const newUser = await User.create({
      name,
      email,
      password,
      phone,
      profileImage,
    });

    logger.info(`✅ Yeni kullanıcı kaydedildi: ${email}`);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      profileImage: newUser.profileImage,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    logger.error(`❌ Kullanıcı kaydı sırasında hata: ${error.message}`);
    res.status(500).json({ message: "Kayıt olurken bir hata oluştu." });
  }
};

// 📌 **Kullanıcı Girişi (Login)**
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn(`🟡 Başarısız giriş - Kullanıcı bulunamadı: ${email}`);
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    // ✅ bcrypt.compare() ile şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`🟡 Başarısız giriş - Yanlış şifre: ${email}`);
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    logger.info(`✅ Başarılı giriş: ${email}`);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } catch (error) {
    logger.error(`❌ Giriş yaparken hata oluştu: ${error.message}`);
    res.status(500).json({ message: "Giriş yaparken bir hata oluştu." });
  }
};

// 📌 **Kullanıcı Profilini Getir (Korunan Rota)**
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Şifreyi döndürme

    if (!user) {
      logger.warn(`🟡 Kullanıcı bulunamadı: ID ${req.user.id}`);
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    logger.info(`✅ Kullanıcı profili getirildi: ID ${req.user.id}`);
    res.json(user);
  } catch (error) {
    logger.error(`❌ Kullanıcı bilgileri alınırken hata: ${error.message}`);
    res.status(500).json({ message: "Kullanıcı bilgileri alınırken hata oluştu." });
  }
};

// 📌 **Kullanıcı Profilini Güncelle (Korunan Rota)**

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.params.id);
    if (!user) {
      logger.warn(`🟡 Kullanıcı bulunamadı: ID ${req.user.id}`);
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    logger.info(`✅ Kullanıcı profili güncellendi: ID ${req.user.id}`);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.profileImage = req.body.profileImage || user.profileImage;
  } catch (error) {
    logger.error(`❌ Kullanıcı profili güncellenirken hata: ${error.message}`);
    res.status(500).json({ message: "Kullanıcı profili güncellenirken hata oluştu." });
  }
}

// 📌 **Kullanıcı Sil**

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      logger.warn(`🟡 Kullanıcı bulunamadı: ID ${req.user.id}`);
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    logger.info(`✅ Kullanıcı silindi: ID ${req.user.id}`);
    await user.remove();
    res.json({ message: "Kullanıcı silindi." });
  } catch (error) {
    logger.error(`❌ Kullanıcı silinirken hata: ${error.message}`);
    res.status(500).json({ message: "Kullanıcı silinirken hata oluştu." });
  }
}


// 📌 **Yeni Kullanıcı Ekle**

export const addUser = async (req, res) => {
  try {
    const { name, email, password, phone, profileImage } = req.body;

    const userExists = await User
      .findOne({ email });
    if (userExists) {
      logger.warn(`🟡 Kullanıcı eklenemedi - E-posta zaten var: ${email}`);
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
        phone,
        profileImage,
      });
      logger.info(`✅ Yeni kullanıcı eklendi: ${email}`);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        profileImage: newUser.profileImage,
        token: generateToken(newUser._id),
      });
    }
  } catch (error) {
    logger.error(`❌ Kullanıcı eklenirken hata: ${error.message}`);
    res.status(500).json({ message: "Kullanıcı eklenirken bir hata oluştu." });
  }
}


