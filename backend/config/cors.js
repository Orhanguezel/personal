import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// ✅ Çevresel değişkenlerden gelen CORS_ORIGIN değerlerini ayrıştır
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : ["*"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`🚫 CORS Engellendi! Yetkisiz Origin: ${origin}`);
      callback(new Error("CORS hatası: Erişime izin verilmeyen kaynak!"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
};

export default cors(corsOptions);
