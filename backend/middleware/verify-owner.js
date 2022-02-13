// --- IMPORTS ---
const User = require("../models/User")
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// --- VERIFY OWNER ---
// Vérifier que l'utilisateur est bien l'auteur du post (ou un admin)
const verifyPostOwner = (req, res, next) => {
    const userId = res.locals.userId;
    try {
        User.findOne({UID: userId})
            .then((userData) => {
                Post.findOne(req.params.postId)
                    .then((post) => {
                        if (post.user_id === userId || userData.is_admin === 1) {
                            next();
                        } else {
                            throw "Vous n'êtes pas autorisé à modifier ce post.";
                        }
                    })
                    .catch(e => res.status(403).json({e: "Forbidden Request !"}))
            })
            .catch(err => res.status(400).json({err}))
    } catch (error) {
        res.status(500).json({error});
    }
}

// Vérifier que l'utilisateur est bien l'auteur du commentaire (ou un admin)
const verifyCommentOwner = (req, res, next) => {
    const userId = res.locals.userId;
    try {
        User.findOne({UID: userId})
            .then((userData) => {
                Comment.findOne(req.params.commentId)
                    .then((comment) => {
                        if (comment.user_id === userId || userData.is_admin === 1) {
                            next();
                        } else {
                            throw "Vous n'êtes pas autorisé à modifier ce commentaire.";
                        }
                    })
                    .catch((e) => res.status(403).json({e: "Forbidden Request !"}))
            })
            .catch(error => res.status(400).json(error))
    } catch (err) {
        res.status(500).json({err});
    }
};

module.exports = {verifyPostOwner, verifyCommentOwner};