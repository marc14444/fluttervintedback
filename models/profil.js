import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true
     },
    firstName: { 
        type: String,
        required: true
    },
    lastName: {
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 

    },
    role: { 
        type: String, 
        required: true 

    },
    bio: { 
        type: String 

    },
    profilePicture: { 
        type: String
    }, // Stocker le chemin de l'image
    createdAt: {
         type: Date, default: Date.now         
    },
    updatedAt: {
         type: Date, default: Date.now        
    }
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
