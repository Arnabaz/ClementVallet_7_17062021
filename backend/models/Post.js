// --- IMPORTS ---
const db = require("../config/db.config");

// Déclaration de la classe Post
class Post {
    constructor(post) {
        this.user_id = post.user_id;
        this.content = post.content;
        this.post_image = post.post_image;
    }

    // Insérer un nouveau post dans la BDD
    static create(newPost) {
        // Requête SQL
        let sql = "INSERT INTO posts (??) VALUES (?);";
        const inserts = [Object.keys(newPost), Object.values(newPost)];
        sql = db.format(sql, inserts);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Gestion des erreurs :
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve("Le post a bien été créé !");
            });
        });
    }

// Supprimer un post dans la BDD
    static delete(postId) {
        // Requête SQL
        let sql = "DELETE FROM posts WHERE ID = ?;";
        sql = db.format(sql, postId);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur
                // Si le post n'existe pas
                if (res.affectedRows === 0) {
                    return reject("Le post n'existe pas.")
                }
                // Pour toute autre erreur
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve("Le post a bien été supprimé !");
            });
        });
    }

// Mettre à jour un post de la BDD
    static update(postData) {
        // Requête SQL
        let sql = `UPDATE posts SET content = ?, post_image = ? WHERE posts.ID = ?;`
        const inserts = [postData.content, postData.post_image, postData.postId];
        sql = db.format(sql, inserts);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur
                // Si aucune donnée n'a été mise à jour
                if (res.affectedRows === 0) {
                    return reject("Les informations du post n'ont pas été mises à jour");
                }
                // Pour toute autre erreur
                if (err) {
                    return reject(err);
                }
                // Si la requête SQL est OK :
                resolve("Les informations du post ont bien été mises à jour !");
            });
        });

    }

// Extraire tous les posts de la BDD (ordonner par date de création)
    static findAll() {
        // Requête SQL
        let sql = "SELECT p.ID, p.content, p.post_image, p.user_id, p.created_at, p.updated_at, u.UID, u.firstname, u.lastname, u.img_profile, likeNumber, commentNumber FROM posts p JOIN users u ON p.user_id = u.UID LEFT JOIN (SELECT f.post_id, COUNT(f.like) AS likeNumber FROM feelings f GROUP BY f.post_id) feelings ON p.id = feelings.post_id LEFT JOIN (SELECT c.post_id, COUNT(*) AS commentNumber FROM comments c GROUP BY c.post_id) comments ON p.id = comments.post_id ORDER BY p.created_at DESC;";
        sql = db.format(sql);
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

// Extraire un seul post de la BDD
    static findOne(postId) {
        // Requête SQL
        let sql = "SELECT posts.content, posts.post_image, posts.created_at, posts.updated_at, users.UID, users.firstname, users.lastname, users.img_profile, users.is_admin FROM posts INNER JOIN users ON users.UID = posts.user_id WHERE posts.ID = ? ORDER BY posts.created_at DESC;";
        sql = db.format(sql, postId);
        return new Promise((resolve, reject) => {
            // Requête à la BDD
            db.query(sql, (err, res) => {
                // Si erreur
                // Si le post n'existe pas :
                if (res.length === 0) {
                    return reject("Ce post n'existe pas.")
                }
                // Pour toute autre erreur
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
module.exports = Post;