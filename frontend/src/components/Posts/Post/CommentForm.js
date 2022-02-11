// --- IMPORTS ---
import React, {useState} from "react";
import axios from "axios";

// --- COMPOSANT : CommentForm ---
const CommentForm = ({imgSrc, postId, updatedCommentNumber, setUpdatedCommentNumber, setPostCommentsDisplayed}) => {
    // Déclaration de variables :
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const token = JSON.parse(localStorage.getItem("user")).token;

    // Déclaration de state :
    const [isPostNotCommented, setIsPostNotCommented] = useState(false);
    const [commentText, setCommentText] = useState("");

    // Déclaration de fonctions :
    // Ajout d'un commentaire
    const submitNewComment = async (e) => {
        // Empecher le rafraichissement auto de la page après soumission du formulaire
        e.preventDefault();
        // Vérifier qu'il y ait bien du texte entré dans l'input du formulaire commentaire
        if (commentText) {
            // Requête POST à l'API
            axios({
                    method: "post",
                    url: `http://localhost:5150/api/comment/${postId}`,
                    headers: {"Authorization": `Bearer ${token}`},
                    data: {
                        content: commentText,
                        user_id: userId,
                        post_id: postId,
                    },
                }
            )
                .then((response) => {
                    setUpdatedCommentNumber(updatedCommentNumber + 1)
                    setPostCommentsDisplayed(true)
                    setCommentText("")
                    setIsPostNotCommented(false)
                })
                .catch((error) => console.log(error))
        } else setIsPostNotCommented(true)
    }

    return (
        <>
            <form className="feedpage-post__comment-form" action="" onSubmit={submitNewComment}>
                <label className="feedpage-post__comment-label" htmlFor="comment-form"><img
                    src={`http://localhost:5150/images/profiles/${imgSrc}`}
                    alt="avatar de "/></label>
                <textarea className="feedpage-post__comment-textarea" name="comment-form" id="comment-form"
                          placeholder="Ecrivez votre commentaire ici"
                          onChange={(e) => setCommentText(e.target.value)} value={commentText}
                />
                <button className="feedpage-post__comment-button">Envoyer</button>
            </form>
            {isPostNotCommented ? (
                <p className="feedpage-post__comment-error">Veuillez entrer du texte pour commenter</p>) : null}
        </>
    )


}

// --- EXPORTS ---
export default CommentForm;