import express from "express";
import dotenv from "dotenv";
import logger from "./config/logger.js";
import swaggerDocs from "./config/swagger.js";
import connectDB from "./config/db.js";
import corsMiddleware from "./config/cors.js"; 
import routes from "./routes/index.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(corsMiddleware);

app.use("/api", routes);

connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  logger.info(`🚀 Server ${PORT} portunda çalışıyor.`);
  swaggerDocs(app);
});
