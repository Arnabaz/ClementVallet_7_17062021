// --- IMPORTS ---
const fs = require("fs");
const Post = require("../models/Post");
const Feeling = require("../models/Feeling");

// --- POST CONTROLLERS ---
// Pour créer un post
exports.createPost = (req, res, next) => {
    const postObject = req.file ? // Régarder si le contenu du post contient un fichier image ou non ?
        { // Si le post contient une image :
            content: req.body.content,
            user_id: res.locals.userId,
            post_image: `${req.file.filename}`
        } : { // Si le post ne contient pas d'image :
            content: req.body.content,
            user_id: res.locals.userId
        }
    // Création de l'instance post de l'objet Post
    const post = new Post({
        ...postObject,
    })
    // Enregistrement des données du post dans la BDD
    Post.create(post)
        .then((response) => res.status(201).json({response}))
        .catch(err => res.status(400).json({err}))
}

// Pour modifier un post
exports.editPost = (req, res, next) => {
    // Récupération des infos du post à modifier
    Post.findOne(req.params.postId)
        .then((post) => {
                // Enregistrement des modifications dans postObject
                let postObject = {
                    content: req.body.content ? req.body.content : post.content,
                    post_image: req.file ? req.file.filename : post.post_image,
                    postId: req.params.postId
                }
                // Mise à jour du post dans la BDD
                Post.update(postObject)
                    .then((message) => {
                        // Si la modification contient une nouvelle image et que le post à modifier en contient une aussi, il faut supprimer l'ancienne image du répertoire
                        if (req.file) {
                            const filename = post.post_image;
                            if (fs.existsSync(`images/posts/${filename}`)) {
                                // Suppression du fichier image du répertoire
                                fs.unlink(`images/posts/${filename}`, () => {
                                })
                            }
                            // Envoi du nom du fichier image au frontend (pour modification dynamique)
                            res.status(201).json({
                                filename: `${req.file.filename}`,
                                message: "Les données du post ont bien été mises à jour"
                            });
                        } else {
                            res.status(201).json({message});
                        }
                    })
                    .catch((err) => {
                        res.status(400).json({err})
                    })
        })
        .catch((err) => res.status(500).json(err))
}

// Pour supprimer un post
exports.deletePost = (req, res, next) => {
    // Récupération des données du post
    Post.findOne(req.params.postId)
        .then((post) => {
            // Suppression du post dans la BDD
            Post.delete(req.params.postId)
                .then((response) => {
                    // Suppression de l'image associée au post dans le répertoire /images/posts :
                    const filename = post.post_image;
                    fs.unlink(`images/posts/${filename}`, () => {
                    });
                    res.status(201).json({response});
                })
                .catch(err => res.status(400).json({err}))
        })
        .catch((error) => res.status(500).json((error)))
}

// Pour liker un post
exports.addFeeling = (req, res, next) => {
    const userId = res.locals.userId;
    const postId = req.params.postId;
    const likeState = req.body.like;
    // On va d'abord vérifier si l'utilisateur a déjà liké le post
    Feeling.findOne({userId: userId, postId: postId})
        .then((feeling) => {
            if (feeling.length === 0) { // Cas 1 : L'utilisateur n'a pas liké le post
                // Création d'une instance feeling de l'objet Feeling
                const newFeeling = new Feeling({
                    like: likeState,
                    user_id: userId,
                    post_id: postId
                })
                // Création du like dans la BDD
                Feeling.create(newFeeling)
                    .then(() => res.status(201).json({message: "Le feeling a bien été créé !"}))
                    .catch((err) => res.status(400).json({err}))
            } else if (feeling.length === 1) { // Cas 2 : L'utilisateur a déjà liké le post
                // Suppression du feeling dans la BDD
                Feeling.delete({userId: userId, postId: postId})
                    .then(() => res.status(201).json({message: "Le feeling a bien été supprimé !"}))
                    .catch((err) => res.status(400).json(err))
            }
        })
        .catch((err) => {
            res.status(500).json({err})
        })
}

// Obtenir une liste des posts likés par l'utilisateur
exports.getIsPostLiked = (req, res, next) => {
    const userId = res.locals.userId;
    const postId = req.params.postId;
    // Recherche du like dans la BDD et récupération des données
    Feeling.findOne({userId: userId, postId: postId})
        .then((feeling) => {
            res.status(201).json(feeling.length)
        })
        .catch((err) => {
            res.status(500).json({err})
        })
}

// Pour lire tous les posts (pour les afficher dans le fil d'actualité)
exports.getAllPosts = (req, res, next) => {
    // Récupération des posts dans la BDD et récupération des données
    Post.findAll()
        .then((postsList) => {
            res.status(201).json(postsList)
        })
        .catch((err) => {
            res.status(500).json({err})
        })
}

// Pour obtenir un seul post
exports.getOnePost = (req, res, next) => {
    // Recherche du post dans la BDD et récupération des données
    Post.findOne(req.params.postId)
        .then((postData) => {
            res.status(201).json(postData)
        })
        .catch((error) => {
            res.status(500).json({error})
        })
}