const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Route principale
app.get("/", (req, res) => {
  res.send("Serveur Arduino → Telegram OK");
});

// ✅ Route pour recevoir les messages
app.post("/send", async (req, res) => {
  const message = req.body.message;
  console.log("📩 Message reçu :", message);

  const botToken = "TON_TOKEN_TELEGRAM_ICI";
  const chatId = "TON_CHAT_ID_ICI";
  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("✅ Réponse Telegram :", data);
    res.json({ status: "Message envoyé à Telegram", data });
  } catch (e) {
    console.error("❌ Erreur d'envoi :", e);
    res.json({ status: "Erreur", error: e.toString() });
  }
});

app.listen(3000, () => {
  console.log("Serveur en ligne sur le port 3000");
});
