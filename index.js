import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// 🔑 Ton token et ton chat_id Telegram
const TOKEN = "8643358390:AAHeGb6J85dAxbsGkKenxdmVk0Bnb_vbjOo";
const CHAT_ID = "8812012712";

// 🟢 Route principale pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
  res.send("Serveur Arduino → Telegram OK");
});

// 🟣 Route pour recevoir les messages de l’Arduino
app.post("/send", async (req, res) => {
  const message = req.body.message || "Message vide";

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;

  try {
    await fetch(url);
    res.json({ status: "Message envoyé à Telegram" });
  } catch (e) {
    res.json({ status: "Erreur", error: e.toString() });
  }
});

// 🚀 Démarrage du serveur
app.listen(3000, () => {
  console.log("Serveur en ligne sur le port 3000");
});
