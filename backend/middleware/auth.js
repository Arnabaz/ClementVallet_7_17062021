// --- IMPORTS ---
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

// Déclaration des variables
const tokenKey = process.env.TOKEN_AUTH_KEY;

// --- AUTH MIDDLEWARE ---
// Vérifie que c'est bien l'utilisateur qui effectue la requête
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, tokenKey);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !";
        } else {
            res.locals.userId = userId;
            next();
        }
    }  catch (err) {
        res.status(401).json({ error: err | "Requête non authentifiée !"});
    }
};

// --- ROLE MIDDLEWARE ---
// Vérifie le niveau d'accès de l'utilisateur : normal(admin aussi) ou admin seulement
const role = (roleType) => {
    return (req, res, next) => {
        User.findOne({ UID: res.locals.userId })
            .then((user) => {
                // Déterminer si l'utilisateur est normal ou admin :
                const userRole = user.is_admin === 1 ? "admin-only" : "normal";

                // Vérifier
                if (userRole === roleType || userRole === "admin-only") {
                    next();
                } else {
                    throw "Requête non autorisée."
                }
            })
            .catch(err => res.status(401).json( err ))
    }
}

// --- EXPORTS ---
module.exports = { auth, role };