import express from "express";
import logger from "./config/logger.js";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import skillRoutes from "./routes/skillRoutes.js"; // ✅ Yeni ekleme!
import aboutRoutes from "./routes/aboutRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import sportRoutes from "./routes/sportRoutes.js";
import socialMediaRoutes from "./routes/socialRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Middleware
app.use((req, res, next) => {
  logger.info(`${req.method} - ${req.path} - ${req.ip}`);
  next();
});

// ✅ MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => logger.info("✅ MongoDB Bağlantısı Başarılı"))
  .catch(err => logger.error("❌ MongoDB Bağlantı Hatası", err));

// ✅ Route Tanımları
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes); // ✅ Yeni route eklendi!

app.use("/api/about", aboutRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/sports", sportRoutes);
app.use("/api/social", socialMediaRoutes);

// ✅ Sunucuyu Başlat
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
