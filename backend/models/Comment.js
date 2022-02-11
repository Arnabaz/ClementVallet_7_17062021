// --- IMPORTS ---
const db = require("../config/db.config");

// Déclaration de la classe Comment
class Comment {
    constructor(comment) {
        this.content = comment.content;
        this.user_id = comment.user_id;
        this.post_id = comment.post_id;
    }

// Insérer un commentaire dans la BDD
    static create(newComment) {
        // Requête SQL
        let sql = "INSERT INTO comments (??) VALUES (?);";
        const inserts = [Object.keys(newComment), Object.values(newComment)];
        sql = db.format(sql, inserts);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve("Le commentaire a bien été créé !");
            });
        });
    }

// Supprimer un commentaire dans la BDD
    static delete(commentId) {
        // Requête SQL
        let sql = "DELETE FROM comments WHERE ID = ?;";
        sql = db.format(sql, commentId);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Gestion des erreurs :
                // Si le commentaire n'existe pas
                if (res.affectedRows === 0) {
                    return reject("Le commentaire n'existe pas.")
                }
                // Pour toute autre erreur
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve("Le commentaire a bien été supprimé !");
            });
        })
    }

// Modifier un commentaire dans la BDD
    static update(commentData) {
        // Requête SQL
        let sql = `UPDATE comments SET comments.content = ? WHERE comments.ID = ?;`;
        const inserts = [commentData.comment, commentData.commentId]
        sql = db.format(sql, inserts);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur
                // Si rien aucune donnée n'a été mise à jour
                if (res.affectedRows === 0) {
                    return reject("Les informations du commentaire n'ont pas été mises à jour");
                }
                // Pour toute autre erreur
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve("Les informations du commentaire ont bien été mises à jour !");
            });
        });
    }

// Extraire tous les commentaires de la BDD (Renvoie tous les commentaires d'un post avec le nom et prénom des utilisateurs)
    static findAll(postId) {
        // Requête SQL
        let sql = `SELECT c.ID, c.content, c.user_id, c.post_id, c.created_at, c.updated_at, u.UID, U.firstname, U.lastname, u.img_profile FROM comments c JOIN users u ON c.user_id = u.UID WHERE post_id = ${postId};`;
        sql = db.format(sql, postId);
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

    static findOne(commentId) {
        // Requête SQL
        let sql = "SELECT * FROM comments WHERE ID = ?;";
        sql = db.format(sql, commentId);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur
                // Si le commentaire n'existe pas
                if (res.length === 0) {
                    return reject("Ce commentaire n'existe pas.")
                }
                // Pour tout autre erreur
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
module.exports = Comment;