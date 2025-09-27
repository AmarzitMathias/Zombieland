import "dotenv/config";
import express from "express";

// Import des modules locaux
import { router } from "./app/router.js";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// BodyParser permettant d'interpréter des données fournies dans un POST, un PATCH ou un PUT, en tant que JSON. Ces données seront stockées dans req.body
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND, // ⬅️ URL du frontend
  credentials: true                 // ⬅️ permet les cookies cross-origin
}));
// Middleware pour accéder à req.cookies
app.use(cookieParser());
// Configurer l'application
app.use(router);



// Lancement du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});