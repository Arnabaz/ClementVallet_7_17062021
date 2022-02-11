// --- IMPORTS ---
import React from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

// --- COMPOSANT : DeletePost ---
const DeletePost = ({postId, setDeletedPost}) => {
    // Déclaration de variables :
    const token = JSON.parse(localStorage.getItem("user")).token;

    // Déclaration de fonctions
    // Suppression d'un post :
    const submitDeletePost = (e) => {
        e.preventDefault()
        if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
            // Requête DELETE à l'API
            axios({
                    method: "delete",
                    url: `http://localhost:5150/api/post/${postId}`,
                    headers: {"Authorization": `Bearer ${token}`},
                },
            )
                .then((response) => {
                    setDeletedPost(true);
                })
                .catch((error) => console.log(error))
        } else {
            console.log("Post non supprimé")
        }
    }

    return (
        <FontAwesomeIcon icon={faTimes} className="feedpage-post__delete" onClick={(e) => submitDeletePost(e)}/>
    )
}

// --- EXPORTS ---
export default DeletePost;