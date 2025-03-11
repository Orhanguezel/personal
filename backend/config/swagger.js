import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "./swaggerDef.js";
import yaml from "yamljs";

// Swagger YAML dosyasını yükle
const swaggerDocsYaml = yaml.load("./swaggerDocs.yaml");

// Swagger için yapılandırma seçenekleri
const options = {
  definition: swaggerDefinition,
  apis: ["./routes/*.js"], // Router içindeki tüm dosyaları tarar
};

// Swagger spesifikasyonlarını oluştur
const swaggerSpec = swaggerJsdoc(options);

// Express uygulamasına Swagger'ı entegre et
const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocsYaml));

  console.log(
    `📌 Swagger UI çalışıyor: ${
      process.env.NODE_ENV === "production"
        ? `${serverUrl}/api-docs`
        : `http://localhost:${process.env.PORT || 5001}/api-docs`
    }`
  );
};

export default swaggerDocs;
