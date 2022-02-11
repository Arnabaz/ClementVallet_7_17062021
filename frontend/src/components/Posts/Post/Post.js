// --- IMPORTS ---
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faComment, faImages, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// Import des composants :
import Comment from "./Comment";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";
// Import de la bibliothèque dayjs pour gérer les dates
import dayjs from "dayjs";

require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


// --- COMPOSANT : Post ---
const Post = ({post, setUpdatedPost, userImgProfile}) => {
    // Déclaration de variables :
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const userRole = JSON.parse(localStorage.getItem("user")).isAdmin;
    const token = JSON.parse(localStorage.getItem("user")).token;

    // Savoir si l'utilisateur est l'auteur du post (pour affichage ou non des boutons de modif ou suppression du post)
    let postOwner;
    post.UID === userId ? postOwner = true : postOwner = false;

    // Déclaration des state :
    const [commentFormDisplayed, setCommentFormDisplayed] = useState(false);
    const [postCommentsDisplayed, setPostCommentsDisplayed] = useState(false);
    const [isPictureToDisplay, setIsPictureToDisplay] = useState(false);
    const [isTextToDisplay, setIsTextToDisplay] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    const [isUpdatingPost, setIsUpdatingPost] = useState(false);

    const [updatePost, setUpdatePost] = useState(null);
    const [updatePicture, setUpdatePicture] = useState(null)
    const [deletedPost, setDeletedPost] = useState(false);
    const [postIsNotModified, setPostIsNotModified] = useState(false);

    // Faire remonter les states des composants enfants :
    const [updatedLikeNumber, setUpdatedLikeNumber] = useState(post.likeNumber);
    const [updatedCommentNumber, setUpdatedCommentNumber] = useState(post.commentNumber);

    useEffect(() => {
        if (updatedCommentNumber === updatedCommentNumber - 1 || updatedCommentNumber + 1 || postCommentsDisplayed === true) {
            handlePostComments()
        }
    }, [updatedCommentNumber, postCommentsDisplayed])

    const handleCommentsDisplayed = () => {
        postCommentsDisplayed ? setPostCommentsDisplayed(false) : setPostCommentsDisplayed(true)
    }

    // Mise à jour des states
    // Affichage du contenu du post :
    useEffect(() => {
        if (post.img_profile === null) {
            setIsTextToDisplay(false)
        } else setIsTextToDisplay(true)
        if (post.post_image === null) {
            setIsPictureToDisplay(false)
        } else setIsPictureToDisplay(true)
    }, [post.img_profile, post.post_image])

// Déclaration de fonctions :
    // Quand on clique sur le bouton de modification d'un post
    const handleUpdatePostForm = () => {
        // Si le formulaire de modification du post est déjà là :
        if (isUpdatingPost) {
            // On replie le formulaire
            setIsUpdatingPost(false);
            // On annule les entrées dans le formulaire en réinitialisant les variables
            setUpdatePicture(null)
            setUpdatePost(null)
            setPostIsNotModified(false)
        } else {
            // Si le formulaire de modification n'est pas présent, alors on l'affiche :
            setIsUpdatingPost(true)
        }
    }

    // Récupération de l'image du post à modifier
    const handleModifiedPicture = (e) => {
        setUpdatePicture(e.target.files[0]);
    }

    // Retirer l'image dans le formulaire de modification du post
    const cancelUpdatePicture = () => {
        setUpdatePicture(null);
    }

    // Modification d'un post
    const handleModifyPost = async (e) => {
        // Empecher la page de se rafraichir après chaque validation du formulaire
        e.preventDefault();
        // Vérifier qu'il y ait un message texte ou une image dans l'input
        if (updatePost || updatePicture) {
            // Création d'un objet postData pour stocker les données du nouveau post
            let updatePostData = new FormData();
            // Cas 1 : Si on a une modif du text et pas de l'image :
            if (updatePost && !updatePicture) {
                updatePostData.append("content", updatePost);
                updatePostData.append("postId", post.ID);
                // Cas 2 : Si on a une modif de l'image et pas du texte :
            } else if (updatePicture && !updatePost) {
                updatePostData.append("post_image", updatePicture, `img_posts_${post.ID}`);
            } else if (updatePost && updatePicture) {
                // Cas 3 : Si on a une modif du text et de l'image :
                updatePostData.append("content", updatePost);
                updatePostData.append("postId", post.ID);
                updatePostData.append("post_image", updatePicture, `img_posts_${post.ID}`);
            }
            // Requête PUT à l'API
            await axios({
                    method: "put",
                    url: `http://localhost:5150/api/post/${post.ID}`,
                    headers: {"Authorization": `Bearer ${token}`},
                    data: updatePostData,
                },
            )
                .then(() => {
                    // Modifier l'état de updatedPost pour déclencher un nouveau rendu de la page
                    setUpdatedPost(true)
                    // Fermer le formulaire de modification du post
                    setIsUpdatingPost(false)
                    // Réinitialiser les valeurs de updatePost et updatePicture
                    setUpdatePost(null)
                    setUpdatePicture(null)
                    // Réinitialiser les messages d'erreur
                    setPostIsNotModified(false)
                })
                .catch((error) => console.log(error))
            // Si on a aucune modif du post :
        } else if (!updatePost && !updatePicture) {
            // Faire apparaitre un message d'erreur
            setPostIsNotModified(true);
        }
    }

    // Lorsqu'on clique sur les commentaires : affichage et récupération des commentaires du post
    const handlePostComments = () => {
        // Si les commentaires sont déjà affichés :
        if (postCommentsDisplayed) {
            axios({
                    method: "get",
                    url: `http://localhost:5150/api/comment/all/${post.ID}`,
                    headers: {"Authorization": `Bearer ${token}`},
                },
            )
                .then((response) => {
                    setCommentsData(response.data)
                })
        }
    }

    // Affichage du formulaire de création d'un commentaire :
    const handleCommentForm = () => {
        commentFormDisplayed ? setCommentFormDisplayed(false) : setCommentFormDisplayed(true)
    }

    return (
        <>
            {deletedPost ? null : (
                <>
                    <header className="feedpage-post__header">
                        <img src={`http://localhost:5150/images/profiles/${post.img_profile}`}
                             alt={`avatar de ${post.firstname} ${post.lastname}`}/>
                        <h3>{`${post.firstname} ${post.lastname}`}</h3>
                        <p className="feedpage-post__date">{dayjs(post.created_at).locale("fr").fromNow()}</p>
                        {userRole || postOwner ?
                            <DeletePost
                                postId={post.ID}
                                setDeletedPost={setDeletedPost}
                            /> : null}
                        {userRole || postOwner ?
                            <FontAwesomeIcon icon={faPen} className="feedpage-post__modify"
                                             onClick={handleUpdatePostForm}/>
                            : null
                        }
                    </header>
                    {isUpdatingPost ? (
                        <form className="feedpage-post__update-form">
                            <label className="feedpage-post__update-label" htmlFor="post-update">Editer le post</label>
                            <textarea className="feedpage-post__update-textarea" name="post-update" id="post-update"
                                      onChange={(e) => setUpdatePost(e.target.value)}
                                      placeholder="Entrez votre texte ici"
                                      defaultValue={post.content}
                            />
                            <label className="feedpage-post__update-file" htmlFor="picture-update"><FontAwesomeIcon
                                icon={faImages}
                                color={updatePicture ? "green" : null}/></label>
                            <input className="feedpage-post__update-input display-none" type="file"
                                   name="picture_update" id="picture-update"
                                   accept=".jpg, .jpeg, .png, .webp, .gif" onChange={(e) => handleModifiedPicture(e)}/>
                            <button className="feedpage-post__update-button" onClick={handleModifyPost}>Valider</button>
                            {updatePicture ? <><p className="feedpage-feedform__picture-message">Image prête à être
                                postée. Nom de l'image : {updatePicture.name}</p>
                                <button className="feedpage-feedform__picture-cancel"
                                        onClick={cancelUpdatePicture}>Retirer l'image
                                </button>
                            </> : null}
                            {postIsNotModified ? (
                                <p className="feedpage-post__update-error">Pour modifier le post, veuillez entrer du
                                    texte et/ou une image</p>) : null}
                        </form>
                    ) : (
                        <div className="feedpage-post__footer">
                            {isTextToDisplay ?
                                <p className="feedpage-post__post">{post.content}</p> : null
                            }
                            {isPictureToDisplay ?
                                <img src={`http://localhost:5150/images/posts/${post.post_image}`} alt=""/>
                                : null
                            }
                            <ul className="feedpage-post__post-info">
                                <li><FontAwesomeIcon
                                    icon={faThumbsUp}/>{updatedLikeNumber ? ` ${updatedLikeNumber}` : " 0"}</li>
                                {updatedCommentNumber ? (
                                    <li className="feedpage-post__post-comments enabled"
                                        onClick={handleCommentsDisplayed}>{`${updatedCommentNumber} `}<FontAwesomeIcon
                                        icon={faComment}/></li>
                                ) : (<li className="feedpage-post__post-comments">0 <FontAwesomeIcon icon={faComment}/>
                                    </li>
                                )}
                            </ul>
                            <ul className="feedpage-post__post-actions">
                                <LikeButton
                                    postId={post.ID}
                                    updatedLikeNumber={updatedLikeNumber}
                                    setUpdatedLikeNumber={setUpdatedLikeNumber}
                                />
                                <li className="comment" onClick={handleCommentForm}><FontAwesomeIcon
                                    icon={faComment}/> Commenter
                                </li>
                            </ul>
                        </div>
                    )}
                    {commentFormDisplayed ? (
                            <CommentForm
                                imgSrc={userImgProfile}
                                postId={post.ID}
                                updatedCommentNumber={updatedCommentNumber}
                                setUpdatedCommentNumber={setUpdatedCommentNumber}
                                setPostCommentsDisplayed={setPostCommentsDisplayed}
                            />
                        ) :
                        null
                    }
                    {postCommentsDisplayed ?
                        <div className="feedpage-comment">
                            {commentsData.map((data) => (
                                <div className="feedpage-comment__container" key={data.ID}>
                                    <Comment
                                        comment={data}
                                        updatedCommentNumber={updatedCommentNumber}
                                        setUpdatedCommentNumber={setUpdatedCommentNumber}
                                        setPostCommentsDisplayed={setPostCommentsDisplayed}
                                    />
                                </div>
                            ))
                            }
                        </div> : null}
                </>
            )}
        </>
    )
}

//------------------------------------------
// --- EXPORT DU COMPOSANT ---
export default Post;