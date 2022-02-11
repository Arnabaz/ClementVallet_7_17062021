// --- IMPORTS ---
// Importation des différents modules
const express = require("express");
const db = require("./config/db.config");

// --- APP ---
const app = express();

// Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

// --- EXPORT ---
module.exports = app;