
import Categorie from "./../models/categorie.js"
import Admin from "../models/admin.js";
//import express from "express"
// import { hash, compare, genSalt } from "bcrypt"

//d'abodr creer une class pour tous les elements du controllers
class CategorieControllers {

    //creer un article
    static async createCategories(req, res) {
        try {
            const {_id} = req.user
           
            const { name, ...body } = req.body;
            let admin = await Admin.findById(_id)
            console.log(admin)
            if(!admin){
                res.status(400).json({status:false, message:"Admin introuvable !!"})
                return
            }
            const exist = await Categorie.findOne({name})
            if (exist) {
                return res.status(404).json({ statut: false, message: "Cette Categorie existe" })
            }
    
            const categories = await Categorie.create({
                adminId:Admin._id, 
                name,
                ...body
            })
            res.status(200).json({ statut: true, message: categories })
        } catch (error) {
            res.status(500).json({ statut:false, message: error.message})
        }
       
    }// Supprimer un article
    static async deleteCategories(req, res) {
      const _id  = req.params.id;
      console.log(req.params)
      const admin = await Categorie.findById(_id)
      if (!Categorie) {
          return res.status(400).json({ statut: false, message: "Cette Categorie n'existe pas" })
      }
      const deleteCategories = await Categorie.deleteOne({ _id })
      if (!deleteCategories) {
          return res.status(400).json({ statut: false, message: "Erreur lors de la supression" })
      }
      res.status(204).json({ statut: true, message: "supprimé avec succès" })
       
  }
  
  // Modifier un article
  static async updateCategories(req, res) {
    const _id = req.params.id
    const admin = await Categorie.findById(_id)
    const { ...body } = req.body
    if (!Categorie) {
        return res.status(400).json({ statut: false, message: "Cette Categorie n'existe pas" })
    }

    const updateCategories = await Categorie.updateOne({ _id }, { ...body })

    if (!updateCategories) {
        return res.status(400).json({ statut: false, message: "Erreur lors de la creation" })
    }

    res.status(201).json({ statut: true, message: "Bien modifié !!!" })
}
  
  // Récupérer un article

  static async getCategories(req, res) {
    const _id = req.params.id

    const admin = await Categorie.findById(_id)
    if (!Categorie) {
        return res.status(400).json({ statut: false, message: "Erreur lors de la recuperation" })
    }

    res.status(200).json({ statut: true, message: Categorie })
   
}


/*   
  static async getArticles(req, res) {
    const id = req.params.id;
  
    // Rechercher l'article en une seule requête à la base de données
    const article = await Articles.findOne(id);
  
    if (!article) {
      return res.status(400).json({ statut: false, message: "Cet article n'existe pas" });
    }
  
    res.status(200).json({ statut: true, message: article });
  } */
  
  // Récupérer tous les articles
  static async getAll(req, res) {
    // Rechercher tous les articles en une seule requête à la base de données
    const Categories = await Categorie.find();
  
    if (!Categories) {
      return res.status(404).json({ statut: false, message: "Aucun article trouvé" });
    }
  
    res.status(201).json({ statut: true, message: Categories });
  }
}
export default CategorieControllers