// --- IMPORTS ---
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// Import de composants :
import DeleteComment from "./DeleteComment";
// Import de la bibliothèque dayjs pour gérer les dates
import dayjs from "dayjs";

require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// --- COMPOSANT : Comment ---
const Comment = ({comment, updatedCommentNumber, setUpdatedCommentNumber, setPostCommentsDisplayed}) => {
    // Déclaration de variables :
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const userRole = JSON.parse(localStorage.getItem("user")).isAdmin;
    const token = JSON.parse(localStorage.getItem("user")).token;

    // Savoir si l'utilisateur est l'auteur du commentaire (pour affichage ou non des boutons de modif ou suppression du commentaire)
    let commentOwner;
    comment.UID === userId ? commentOwner = true : commentOwner = false;

    // Déclaration de states :
    const [isUpdatingComment, setIsUpdatingComment] = useState(false)
    const [commentUpdate, setCommentUpdate] = useState(comment.content);
    const [commentIsNotUpdated, setCommentIsNotUpdated] = useState(false)
    const [deletedComment, setDeletedComment] = useState(false);

    // Mise à jour du rendu du texte du commentaire (sans rafraichir la page)
    useEffect(() => {
        setCommentUpdate(comment.content)
    }, [comment.content])

// Déclaration de fonctions :
    // Affichage du formulaire de création d'un commentaire :
    const handleCommentUpdateForm = () => {
        if (isUpdatingComment) {
            setIsUpdatingComment(false);
            setCommentUpdate(comment.content);
            setCommentIsNotUpdated(false)
        } else {
            setIsUpdatingComment(true);
        }
    }

    // Modification d'un commentaire
    const handleModifyComment = (e) => {
        // Empecher la page de se rafraichir après chaque validation du formulaire
        e.preventDefault();
        if (commentUpdate) {
            // Requête PUT à l'API
            axios({
                    method: "put",
                    url: `http://localhost:5150/api/comment/${comment.ID}`,
                    headers: {"Authorization": `Bearer ${token}`},
                    data: {
                        content: commentUpdate,
                        commentId: comment.ID
                    },
                },
            )
                .then((response) => {
                    setIsUpdatingComment(false);
                    setCommentUpdate(commentUpdate);
                    setPostCommentsDisplayed(false);
                    setPostCommentsDisplayed(true);
                    setCommentIsNotUpdated(false)
                })
                .catch((error) => console.log(error))
        } else if (!commentUpdate) {
            setCommentIsNotUpdated(true)
        }
    }

    return (
        <>
            {deletedComment ? null : (
                <>
                    <header className="feedpage-comment__header">
                        <img src={`http://localhost:5150/images/profiles/${comment.img_profile}`}
                             alt={`àvatar de ${comment.firstname} ${comment.lastname}`}/>
                        <h3>{`${comment.firstname} ${comment.lastname}`}</h3>
                        <p className="feedpage-comment__date">{dayjs(comment.created_at).locale("fr").fromNow()}</p>
                        {userRole || commentOwner ?
                            <DeleteComment
                                commentId={comment.ID}
                                updatedCommentNumber={updatedCommentNumber}
                                setUpdatedCommentNumber={setUpdatedCommentNumber}
                                setDeletedComment={setDeletedComment}
                            /> : null
                        }
                        {userRole || commentOwner ?
                            <FontAwesomeIcon icon={faPen} className="feedpage-comment__modify" onClick={handleCommentUpdateForm}/>
                            : null
                        }
                    </header>
                    {isUpdatingComment ?
                        <form className="feedpage-comment__update-form">
                            <label className="feedpage-comment__update-label" htmlFor="comment-update">Editer le
                                commentaire</label>
                            <textarea className="feedpage-comment__update-textarea" name="comment-update"
                                      id="comment-update"
                                      placeholder="Ecrivez votre texte ici"
                                      onChange={(e) => setCommentUpdate(e.target.value)}
                                      defaultValue={commentUpdate}/>
                            <button className="feedpage-comment__update-button" onClick={handleModifyComment}>Valider
                            </button>
                            {commentIsNotUpdated ? (
                                <p className="feedpage-comment__update-error">Pour modifier votre commentaire, veuillez
                                    entrer du texte</p>) : null}
                        </form> : <p className="feedpage-comment__comment">{commentUpdate}</p>
                    }

                </>
            )}
        </>
    )
}

// --- EXPORTS ---
export default Comment;