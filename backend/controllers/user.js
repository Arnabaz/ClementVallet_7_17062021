// --- IMPORTS ---
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();
const {signUpErrors} = require('../utils/errors.utils');

const User = require("../models/User");

// --- USER CONTROLLERS
// Pour s'inscrire à l'application
// Hachage du mot de passe avec bcrypt
exports.signUp = async (req, res, next) => {
    try {
        // Hachage du mot de passe avec bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // Validation des entrées à faire

        // Création d'une instance user de l'object User pour récupérer les entrées utilisateur
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            img_profile: "default_profile_img.jpg"
        });
        // Enregistrement de l'utilisateur dans la base de données
        User.create(user)
            .then((response) => {
                res.status(201).json({response})
            })
            .catch((err) => {
                const errors = signUpErrors(err);
                res.status(200).send({errors})
                next();
            })
    } catch (err) {
        res.status(500).send({err});
    }
}

exports.logIn = (req, res, next) => {
// Recherche de l'utilisateur dans la BDD avec son email
    User.findOne({email: req.body.email})
        .then((userData) => {
            // Si l'utilisateur n'existe pas, renvoyer une erreur
            if (!userData) {
                return res.status(404).json({message: "Utilisateur non trouvé !"})
            }
            // Si l'utilisateur existe, comparer les mots de passe avec bcrypt (compare renvoie true ou false)
            bcrypt.compare(req.body.password, userData.password)
                .then((valid) => {
                    // Si les mots de passe sont différents, renvoyer une erreur
                    if (!valid) {
                        return res.status(401).json({message: "Mot de passe incorrect !"});
                    }
                    // Si les mots de passe sont identiques, envoyer la réponse
                    res.status(200).json({
                        userId: userData.UID,
                        isAdmin: userData.is_admin,
                        token: jwt.sign(
                            {userId: userData.UID},
                            process.env.TOKEN_AUTH_KEY,
                            {expiresIn: "24h"})
                    });
                })
                .catch((err) => res.status(401).json({err}))
        })
        .catch(error => res.status(500).json({error}))
}

// Pour modifier les informations d'un utilisateur
exports.updateUser = (req, res, next) => {
    // Recherche de l'utilisateur dans la base de données
    User.findOne({UID: req.params.id})
        .then((user) => {
            // Enregistrement des modifications dans userObject
            let userObject = {
                firstname: req.body.firstname ? req.body.firstname : user.firstname,
                lastname: req.body.lastname ? req.body.lastname : user.lastname,
                img_profile: req.file ? req.file.filename : user.img_profile,
                userId: req.params.id
            }
            // Mise à jour des données de l'utilisateur
            User.update(userObject)
                .then((message) => {
                    if (req.file) {
                        const filename = user.img_profile;
                        if (filename !== "default_profile_img.jpg") {
                            fs.unlink(`images/profiles/${filename}`, () => {
                            })
                        }
                        res.status(201).json({
                            filename: `${req.file.filename}`,
                            message: "Les données du profil ont bien été mises à jour"
                        })
                    } else {
                        res.status(201).json({message})
                    }
                })
                .catch(error => res.status(400).json({error}));
        })
        .catch(err => res.status(500).json({err}))
}

// Pour supprimer le compte d'un utilisateur
exports.deleteUser = (req, res, next) => {
    // Suppression de l'image de profil dans le répertoire /images/profiles
    User.findOne({UID: req.params.id})
        .then((user) => {
            // Suppression de l'utilisateur dans la BDD
            User.delete(req.params.id)
                .then(response => res.status(201).json({ response }))
                .catch((error) => res.status(500).json({error}))
            // Récupération du nom du fichier image
            const filename = user.img_profile;
            // Exclure le nom "default_profile_img.jps" qui est l'image de profil fournie par le backend et qui ne doit pas être supprimée !
            if (filename !== "default_profile_img.jpg") {
                // Pour tous les autres fichiers images, on supprime le fichier du répertoire /images/profiles
                fs.unlink(`images/profiles/${filename}`, () => {
                    console.log("L'image de profil a bien été supprimée.");
                })}})
        .catch(err => res.status(500).json({ err }))

}

// Pour obtenir une liste de tous les utilisateurs et leurs infos
exports.getAllUsers = (req, res, next) => {
    // Recherche de tous les utilisateurs dans la BDD et récupération des données
    User.findAll()
        .then((usersList) => {
            res.status(201).json(usersList)
        })
        .catch((error) => {
            res.status(500).json({error})
        })
}

// Pour obtenir les infos d'un seul utilisateur
exports.getUserInfo = (req, res, next) => {
    // Recherche de l'utilisateur dans la BDD et récupération des données
    User.findOne({UID: req.params.id})
        .then((userData) => {
            res.status(201).json(userData)
        })
        .catch((error) => {
            res.status(500).json({error})
        })
}
