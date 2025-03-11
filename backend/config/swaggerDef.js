import dotenv from "dotenv";
dotenv.config();

// Ortama bağlı olarak server URL'sini belirle
const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://your-deployment-url.com/api"
    : `http://localhost:${process.env.PORT || 5001}/api`;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Personal Portfolio API",
    version: "1.0.0",
    description: "Kişisel portföy projesi için API dokümantasyonu",
  },
  servers: [
    {
      url: serverUrl,
      description:
        process.env.NODE_ENV === "production"
          ? "Production Server"
          : "Local Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

export default swaggerDefinition;
