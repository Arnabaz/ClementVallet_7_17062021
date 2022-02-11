// --- IMPORTS ---
import React from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

// --- COMPOSANT : DeleteComment ---
const DeleteComment = ({commentId, updatedCommentNumber, setUpdatedCommentNumber, setDeletedComment}) => {
    // Déclaration de variables :
    const token = JSON.parse(localStorage.getItem("user")).token;

    // Déclaration de fonctions :
    // Suppression d'un commentaire
    const submitDeleteComment = (e) => {
        e.preventDefault()
        if (window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
            // Requête DELETE à l'API
            axios({
                    method: "delete",
                    url: `http://localhost:5150/api/comment/${commentId}`,
                    headers: {"Authorization": `Bearer ${token}`},
                },
            )
                .then((response) => {
                    setUpdatedCommentNumber(updatedCommentNumber - 1)
                    setDeletedComment(true);
                })
                .catch((error) => console.log(error))
        } else {
            console.log("Commentaire non supprimé")
        }
    }

    return (
        <FontAwesomeIcon icon={faTimes} className="feedpage-comment__delete" onClick={(e) => submitDeleteComment(e)}/>
    )
}

// --- EXPORTS ---
export default DeleteComment;