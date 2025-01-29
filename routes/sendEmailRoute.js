const express = require("express");
const transporter = require("./transporter"); // Güncellenmiş yapı
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Lütfen tüm alanları doldurun." });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "orhan.guezel@dci-student.org",
      subject: `Yeni Mesaj: ${subject}`,
      html: `
        <h2>Yeni Mesaj</h2>
        <p><strong>Ad:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <p><strong>Mesaj:</strong> ${message}</p>
      `,
    });
    res.status(200).json({ message: "E-posta başarıyla gönderildi!" });
  } catch (error) {
    console.error("E-posta gönderim hatası:", error);
    res.status(500).json({ error: "E-posta gönderiminde hata oluştu." });
  }
});

// GET isteği için test endpointi
router.get("/", (req, res) => {
  res.json({ message: "E-posta API'si çalışıyor! POST isteği ile e-posta gönderebilirsiniz." });
});

module.exports = router;

