import userControllers from "../controllers/users.js";
import upload from "../middlewares/multer.js";  // Assurez-vous que le chemin est correct
import { Router } from "express";

const router = Router();

router.post("/", upload.single("image"), userControllers.createUser);
router.get("/", userControllers.getAll);
router.get("/:id", userControllers.getUser);
router.put("/:id", upload.single("image"), userControllers.updateUser); // Utiliser upload pour les mises à jour avec image
router.post("/login", userControllers.login);
router.delete("/:id", userControllers.deleteUser);

export default router;