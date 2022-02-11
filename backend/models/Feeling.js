// --- IMPORTS ---
const db = require("../config/db.config");

// Déclaration de la classe Feeling
class Feeling {
    constructor(feeling) {
        this.like = feeling.like;
        this.user_id = feeling.user_id;
        this.post_id = feeling.post_id;
    }

    // Insérer un nouveau like/feeling dans la BDD
    static create(newFeeling) {
        // Requête SQL
        let sql = "INSERT INTO feelings (??) VALUES (?);";
        const inserts = [Object.keys(newFeeling), Object.values(newFeeling)];
        sql = db.format(sql, inserts);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve("Le like/unlike a bien été créé !");
            });
        });
    }

    // Supprimer un like/feeling dans la BDD
    static delete(feelingData) {
        // Requête SQL
        let sql = "DELETE FROM feelings WHERE post_id = ? AND user_id = ?;";
        const inserts = [feelingData.postId, feelingData.userId];
        sql = db.format(sql, inserts);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve("Le like a bien été supprimé !");
            });
        });
    }

    // Extraire un feeling de la BDD
    static findOne(feelingData) {
        // Requête SQL
        let sql = "SELECT * FROM feelings WHERE post_id = ? AND user_id = ?;";
        const inserts = [feelingData.postId, feelingData.userId];
        sql = db.format(sql, inserts);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve(res);
            });
        });
    }
}

// --- EXPORT ---
module.exports = Feeling;