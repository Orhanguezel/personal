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

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

