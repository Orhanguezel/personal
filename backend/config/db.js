import mongoose from "mongoose";
import logger from "./logger.js"; // Eğer loglama varsa ekleyelim
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`✅ MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`❌ MongoDB Bağlantı Hatası: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

