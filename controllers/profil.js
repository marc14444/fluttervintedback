import Profile from '../models/profil.js';

class ProfileController {
    async createProfile(req, res) {
        try {
            const { userId, firstName, lastName, email, role, bio } = req.body;
    
            // Vérifier si l'utilisateur a déjà un profil avec une image de profil
            const existingProfile = await Profile.findOne({ userId });
            if (existingProfile && existingProfile.profilePicture) {
                return res.status(400).json({ message: 'L\'utilisateur a déjà une image de profil' });
            }
    
            // Gérer le téléchargement de l'image de profil
            const profilePicture = req.file ? req.file.path : null;
    
            // Créer un nouveau profil
            const newProfile = new Profile({ userId, firstName, lastName, email, role, bio, profilePicture });
            await newProfile.save();
    
            res.status(201).json(newProfile);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }    

    async getAllProfiles(req, res) {
        try {
            const profiles = await Profile.find().populate('userId');
            res.status(200).json(profiles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProfile(req, res) {
        try {
            const profile = await Profile.findById(req.params.id).populate('userId');
            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            res.status(200).json(profile);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProfile(req, res) {
        try {
            const { firstName, lastName, email, bio } = req.body;
            const profilePicture = req.file ? req.file.path : null; // Vérifier si un fichier a été téléchargé
            const updatedProfile = await Profile.findByIdAndUpdate(
                req.params.id,
                { firstName, lastName, email, bio, profilePicture, updatedAt: Date.now() },
                { new: true }
            );
            if (!updatedProfile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            res.status(200).json(updatedProfile);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProfile(req, res) {
        try {
            const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
            if (!deletedProfile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            res.status(200).json({ message: 'Profile deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ProfileController();
