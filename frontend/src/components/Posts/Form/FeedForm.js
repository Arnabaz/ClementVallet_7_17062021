// --- IMPORTS ---
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// --- COMPOSANT : FeedForm ---
const FeedForm = ({imgSrc, setAddedPost}) => {
    // Déclaration de variables :
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const token = JSON.parse(localStorage.getItem("user")).token;

    // Déclaration des states :
    const [postText, setPostText] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [isNotPosted, setIsNotPosted] = useState(false);

// Déclaration de fonctions :
    // Ajout d'une image dans le post à créer et récupération du nom de l'image uploadée pour affichage à côté du bouton image
    const handlePicture = (e) => {
        setPostPicture(e.target.files[0])
    }

    // Ajout d'un post
    const submitNewPost = async (e) => {
        // Empecher le rafraichissement auto de la page après soumission du formulaire
        e.preventDefault();
        // Vérifier qu'il y ait un message texte ou une image dans l'input
        if (postText || postPicture) {
            // Création d'un objet postData pour stocker les données du nouveau post
            const postData = new FormData();
            postData.append("user_id", userId);
            postData.append("content", postText);
            if (postPicture) postData.append("post_image", postPicture,`img_posts_${userId}`);

            // Gestion des erreurs et validation des entrée pour texte et image (faire backend aussi)


            // Requête GET à l'API
            await axios({
                    method: "post",
                    url: `http://localhost:5150/api/post`,
                    headers: {"Authorization": `Bearer ${token}`},
                    data: postData,
                },
            )
                .then((response) => {
                    setAddedPost(true);
                    setPostText("")
                    setPostPicture(null);
                    setIsNotPosted(false);
                })
                .catch((error) => console.log(error))
        } else { // Si pas d'image ou de texte, envoyer un message d'alerte
            setIsNotPosted(true);
        }
    }

    // Retirer l'image dans le formulaire de création du post
    const cancelPostPicture = () => {
        setPostPicture(null)
    }

    return (
        <>
            <form className="feedpage-feedform" action="" method="post" encType="multipart/formData">
                <label className="feedpage-feedform__label text" htmlFor="post_text">
                    <img src={`http://localhost:5150/images/profiles/${imgSrc}`} className="feedpage-feedform__img" alt="photo de profil"/>
                </label>
                <textarea className="feedpage-feedform__textarea" name="post_text" id="post_text"
                          placeholder="Ecrivez votre texte ici" onChange={(e) => setPostText(e.target.value)}
                          value={postText}/>
                <label className="feedpage-feedform__label image" htmlFor="post_image">
                    <FontAwesomeIcon icon={faImages} color={postPicture ? "green" : null}/>
                </label>
                <input type="file" name="post_image" id="post_image" className="feedpage-feedform__input-file display-none"
                       accept=".jpg, .jpeg, .png, .webp, .gif" onChange={(e) => handlePicture(e)}/>
                <button className="feedpage-feedform__button" onClick={submitNewPost}>Envoyer</button>
            </form>
            {isNotPosted ? <p className="feedpage-feedform__error-message">Veuillez entrer votre message avant de poster</p> : null}
            {postPicture ? <><p className="feedpage-feedform__picture-message">Image prête à être postée. Nom de l'image : {postPicture.name}</p><button className="feedpage-feedform__picture-cancel" onClick={cancelPostPicture}>Retirer l'image</button></> : null}
        </>
    )
}

// --- EXPORTS ---
export default FeedForm;