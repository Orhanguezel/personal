const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: "orhan.guezel@dci-student.org",
    pass: "", // Google'dan aldığınız uygulama şifresi
  },
});

module.exports = transporter;

