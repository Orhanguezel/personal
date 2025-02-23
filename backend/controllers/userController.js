import bcrypt from "bcryptjs"; // ✅ Doğru
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// 📌 Kullanıcı Kayıt (Register)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });
    }

    // ✅ Şifreyi hashleyerek kaydet
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // ✅ Hashlenmiş şifre kaydediliyor
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Kayıt olurken bir hata oluştu." });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    // ✅ bcrypt.compare() kullanarak şifreyi doğrula
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    // ✅ Giriş başarılı olduğunda kullanıcı bilgilerini döndür
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(`Giriş yaparken hata oluştu: ${error.message}`);
    res.status(500).json({ message: "Giriş yaparken bir hata oluştu." });
  }
};


// 📌 Kullanıcı Profilini Getir (Korunan Rota)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Şifreyi döndürme
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınırken hata oluştu." });
  }
};
