// --- IMPORTS ---
const db = require("../config/db.config");

// Déclaration de la classe User
class User {
    constructor(user) {
        this.email = user.email;
        this.password = user.password;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.img_profile = user.img_profile;
    }

// Insérer un utilisateur dans la BDD
    static create(newUser) {
        // Requête SQL
        let sql = "INSERT INTO users (??) VALUES (?);";
        const inserts = [Object.keys(newUser), Object.values(newUser)];
        sql = db.format(sql, inserts);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur :
                if (err) {
                    return reject(err)
                }
                // Si la requête SQL est OK :
                resolve("L'utilisateur a bien été créé dans la BDD !");
            });
        });
    }

// Supprimer un utilisateur dans la BDD
    static delete(userId) {
        // Requête SQL
        let sql = "DELETE FROM users WHERE UID = ?;";
        sql = db.format(sql, userId);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur :
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve("L'utilisateur a bien été supprimé !");
            });
        });
    }

// Modifier UNE seule information d'un utilisateur dans la BDD
    static update(userData) {
        // Requête SQL
        let sql = `UPDATE users SET firstname = ?, lastname = ?, img_profile = ? WHERE UID = ?;`
        const inserts = [userData.firstname, userData.lastname, userData.img_profile, userData.userId];
        sql = db.format(sql, inserts);
        return new Promise((resolve, reject) => {
            // Requête ç la BDD
            db.query(sql, (err, res) => {
                // Si erreur :
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve("Les informations de l'utilisateur ont bien été mises à jour !");
            });
        });
    }

// Extraire les informations de tous les utilisateurs de la BDD
    static findAll() {
        // Requête SQL
        let sql = "SELECT u.UID, u.firstname, u.lastname, u.img_profile, u.is_admin FROM users u;";
        sql = db.format(sql);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur :
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve(res);
            });
        });
    }

// Extraire les informations d'un seul utilisateur de la BDD
    static findOne(userData) {
        // Requête SQL
        let sql = "SELECT * FROM users WHERE ?? = ?;";
        const inserts = [Object.keys(userData), Object.values(userData)];
        sql = db.format(sql, inserts);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur :
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve(res[0]);
            });
        });
    }
}

// --- EXPORT ---
module.exports = User;