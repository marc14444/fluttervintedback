import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import { config } from "dotenv";
import cors from "cors";
import { EventEmitter } from 'events';
import profileRoutes from './routes/profil.js'; 
import categorieRoutes from "./routes/categorie.js";// Note: express.json() et express.urlencoded() remplacent body-parser pour la plupart des cas
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/users.js";
import articleRouter from "./routes/articles.js";
import connectDb from "./baseDEdonnees/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config(); // Charger les variables d'environnement
connectDb(); // Établir la connexion à la base de données

const app = express();
const port = process.env.PORT || 4000;
//const host = "192.168.252.184"
// augmenter le nombre de listeners maximum en utilisant 
EventEmitter.defaultMaxListeners = 15;


// Middleware CORS
app.use(cors());

// Middleware pour le parsing JSON et URL encodée
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static(path.join(__dirname, "public")));

// Définir les routes
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/article", articleRouter);
app.use('/api/profile', profileRoutes);
app.use('/api/categorie', categorieRoutes);


//Middleware Multer 
// Démarrer le serveur après la connexion à la base de données
connectDb()
  .then(() => {
    app.listen(port,() => console.log(`Le serveur a bien démarré sur http://localhost :${port}`));
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données:", error);
  });
