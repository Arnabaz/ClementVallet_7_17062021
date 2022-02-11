// --- IMPORTS ---
// Importation des différents modules
const express = require("express");
const db = require("./config/db.config");
const path = require("path"); // Import de path

// Importation des routes de l'API
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth-routes");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

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

app.use("/images", express.static(path.join(__dirname, "images")));

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// --- EXPORT ---
module.exports = app;