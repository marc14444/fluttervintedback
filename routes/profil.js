import { Router } from 'express';
import ProfileController from '../controllers/profil.js';
import { verifyToken } from '../middlewares/authProfil.js';
import upload from '../middlewares/multer.js';

const router = Router();

router.post('/', verifyToken, upload.single('profilePicture'), ProfileController.createProfile);
router.get('/', verifyToken, ProfileController.getAllProfiles);
router.get('/:id', verifyToken, ProfileController.getProfile);
router.put('/:id', verifyToken, upload.single('profilePicture'), ProfileController.updateProfile);
router.delete('/:id', verifyToken, ProfileController.deleteProfile);

export default router;