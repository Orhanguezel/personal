const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = 3005;

app.use(cors());
app.use(bodyParser.json());

const sendEmailRoute = require("./routes/sendEmailRoute");

app.use("/send-email", sendEmailRoute);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});



app.get("/", (req, res) => {
  res.send("API Çalışıyor! Lütfen /send-email adresine istek at.");
});

