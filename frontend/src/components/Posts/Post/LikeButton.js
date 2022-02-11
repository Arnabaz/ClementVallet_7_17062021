// --- IMPORTS ---
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// --- COMPOSANT : LikeButton ---
const LikeButton = ({postId, updatedLikeNumber, setUpdatedLikeNumber}) => {
    // Déclaration de variables :
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const token = JSON.parse(localStorage.getItem("user")).token;

    // Déclaration de state :
    const [isAlreadyLiked, setIsAlreadyLiked] = useState(null);

    // Mise à jour des states
    useEffect(() => {
        handleIsAlreadyLiked()
    }, [])

    // Déclaration de fonctions :
    // Ajout/retrait d'un like
    const submitLike = (e) => {
        e.preventDefault();
        // Requête POST à l'API
        axios({
                method: "post",
                url: `http://localhost:5150/api/post/like/${postId}`,
                headers: {"Authorization": `Bearer ${token}`},
                data: {
                    like: 1,
                    user_id: userId,
                    post_id: postId,
                },
            },
        )
            .then((response) => {
                // Changer le state du composant
                if (isAlreadyLiked) {
                    setUpdatedLikeNumber(updatedLikeNumber - 1)
                    setIsAlreadyLiked(false)
                } else {
                    setUpdatedLikeNumber(updatedLikeNumber + 1)
                    setIsAlreadyLiked(true)
                }
            })
            .catch((error) => console.log(error))
    }

    // Affichage du bouton Like : Aimer ou Ne plus aimer ?
    const handleIsAlreadyLiked = () => {
        axios({
            method: "get",
            url: `http://localhost:5150/api/post/isliked/${postId}`,
            headers: {"Authorization": `Bearer ${token}`},
            data: {
                user_id: userId,
            },
        })
            .then((response) => {
                if (response.data === 1) {
                    setIsAlreadyLiked(true)
                } else if (response.data === 0) {
                    setIsAlreadyLiked(false)
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            {isAlreadyLiked ? (
                <li className="unlike" onClick={submitLike}> Ne plus aimer</li>
            ) : (
                <li className="like" onClick={submitLike}><FontAwesomeIcon icon={faThumbsUp}/> Aimer</li>
            )}
        </>

    )
}

// --- EXPORTS ---
export default LikeButton;