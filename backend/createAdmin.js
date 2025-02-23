import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log("MongoDB bağlantısı başarılı!");

  const existingAdmin = await User.findOne({ role: "admin" });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    await User.create({
      name: "Admin Kullanıcı",
      email: "a@example.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin hesabı oluşturuldu!");
  } else {
    console.log("Admin zaten mevcut!");
  }

  mongoose.connection.close();
}).catch(err => console.log("MongoDB bağlantı hatası:", err));
