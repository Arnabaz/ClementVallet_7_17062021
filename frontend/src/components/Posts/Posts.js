// --- IMPORTS ---
import React, {useEffect, useState} from "react";
import axios from "axios";
// Import de composants :
import Post from "./Post/Post";

// --- COMPOSANT : Posts ---
const Posts = ({addedPost, setAddedPost, userImgProfile}) => {
    // Déclaration de variables :
    const token = JSON.parse(localStorage.getItem("user")).token;

    // Déclaration des state :
    const [postsData, updatePostsData] = useState([]);
    const [updatedPost, setUpdatedPost] = useState(false);

    // Déclaration de fonctions :
    // Affichage des posts du fil d'actualités
    useEffect(() => {
        // Requête GET à l'API
        axios({
                method: "get",
                url: `http://localhost:5150/api/post`,
                headers: {"Authorization": `Bearer ${token}`},
            },
        )
            .then((response) => {
                // Récupération des données envoyées par l'API
                updatePostsData(response.data);
                // Réinitialisation de la variable updatePost (pour pouvoir modifier un post plusieurs fois)
                setUpdatedPost(false);
                // Réinitialisation de la variable addedPost (pour pouvoir ajouter des posts plusieurs fois)
                setAddedPost(false)
            })
            .catch((error) => console.log(error))
    }, [addedPost, updatedPost, token])

    return (
        <>
            {
                postsData.map((data) => (
                    <article className="feedpage-post" key={data.ID}>
                        <Post
                            post={data}
                            setUpdatedPost={setUpdatedPost}
                            userImgProfile={userImgProfile}
                        />
                    </article>
                ))
            }
        </>

    )
}

// --- EXPORTS ---
export default Posts;
