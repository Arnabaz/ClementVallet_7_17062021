// --- IMPORTS ---
const Comment = require("../models/Comment");

// --- COMMENT CONTROLLERS ---
// Pour créer un commentaire
exports.createComment = (req, res, next) => {
    const userId = res.locals.userId;
    const postId = req.params.postId;
    // Création de l'instance comment de l'objet Comment
    const comment = new Comment({
        content: req.body.content,
        post_id: postId,
        user_id: userId
    });
    // Enregistrement des données du commentaire dans la BDD
    Comment.create(comment)
        .then((response) => res.status(201).json({response}))
        .catch(err => res.status(400).json({err}));
}

// Pour modifier un commentaire
exports.editComment = (req, res, next) => {
    // Récupération des informations du commentaire
    Comment.findOne(req.params.commentId)
        .then((comment) => {
            // Vérification de l'auteur du commentaire

            // Enregistrement des modifications avec commentObject
            let commentData = {
                comment: req.body.content ? req.body.content : comment.content,
                commentId: req.params.commentId
            };
            Comment.update(commentData)
                .then((message) => {
                    res.status(201).json({message})
                })
                .catch((err) => {
                    res.status(400).json({err})
                })
        })
        .catch((error) => res.status(500).json(error))
}

// Pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.delete(req.params.commentId)
        .then((response) => {
            res.status(201).json({response})
        })
        .catch(err => res.status(500).json({err}))
}

// Pour obtenir tous les commentaires d'un post
exports.getAllComments = (req, res, next) => {
    Comment.findAll(req.params.postId)
        .then((commentsList) => {
            res.status(201).json(commentsList)
        })
        .catch((err) => {
            res.status(500).json({err})
        })
}