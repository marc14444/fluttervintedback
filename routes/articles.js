import ArticlesControllers from "../controllers/articles.js";
import upload from "../middlewares/multer.js";  
import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js"; // Vérifiez également ce chemin

const router = Router();

router.get("/", verifyToken, ArticlesControllers.getAll);
router.get("/:id", verifyToken, ArticlesControllers.getArticles);
router.put("/:id", verifyToken, upload.single("image"), ArticlesControllers.updateArticles);
router.post("/", verifyToken, upload.single("image"), ArticlesControllers.createArticles);
router.delete("/:id", verifyToken, ArticlesControllers.deleteArticles);

export default router;