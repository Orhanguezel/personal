import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Konsola yazdır
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Hataları dosyaya kaydet
    new winston.transports.File({ filename: "logs/combined.log" }) // Tüm logları kaydet
  ],
});

export default logger;
