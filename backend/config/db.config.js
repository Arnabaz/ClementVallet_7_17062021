// --- IMPORTS ---
const mysql = require("mysql");
require("dotenv").config();

// --- DATABASE CONFIG ---
// Déclarations des variables d'environnement
const hostDB = process.env.DB_HOST;
const usernameDB = process.env.DB_USER;
const passwordDB = process.env.DB_PASSWORD;
const nameDB = process.env.DB_NAME;

const db = mysql.createConnection({
    host: hostDB,
    user: usernameDB,
    password: passwordDB,
    database: nameDB
});

db.connect(err => {
    if (err) {
        console.error("Une erreur ne permet pas la connexion à la BDD MySQL:" + err);
        return
    }
    console.log("Connexion à la BDD MySQL réussie !");
});

// --- EXPORT ---
module.exports = db;