import CategorieControllers from "../controllers/categorie.js";
import upload from "../middlewares/multer.js";  
import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js"; // Vérifiez également ce chemin

const router = Router();

router.get("/", verifyToken, CategorieControllers.getAll);
router.get("/:id", verifyToken, CategorieControllers.createCategories);
router.put("/:id", verifyToken, upload.single("image"), CategorieControllers.updateCategories);
router.post("/", verifyToken, upload.single("image"), CategorieControllers.createCategories);
router.delete("/:id", verifyToken, CategorieControllers.deleteCategories);

export default router;