// --- IMPORTS ---
import React, {useEffect, useState} from "react";
import axios from "axios";
// Import de composants :
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Posts from "../components/Posts/Posts";
import FeedForm from "../components/Posts/Form/FeedForm";

// --- COMPOSANT : Feed ---
const Feed = () => {
    // Déclaration de variables :
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const token = JSON.parse(localStorage.getItem("user")).token;

    // Déclaration de states :
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        imgProfile: "default_profile_img.jpg",
    })
    const {firstname, lastname, imgProfile} = user;

    const [addedPost, setAddedPost] = useState(false);

    // Déclaration de fonctions:
    // Récupération des données de l'utilisateur
    useEffect(() => {
        // Requête GET à l'API
        axios({
                method: "get",
                url: `http://localhost:5150/api/user/${userId}`,
                headers: {"Authorization": `Bearer ${token}`},
            },
        )
            .then((response) => {
                setUser({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    imgProfile: response.data.img_profile,
                });
            })
            .catch((error) => console.log(error))

    }, [userId, token]);

    return (
        <>
            <Header/>
            <main className="feedpage-main">
                <section className="feedpage-top__section">
                    <header className="feedpage-top__section-header">
                        <h1>Bonjour {`${firstname} ${lastname}`}</h1>
                    </header>
                    <FeedForm
                        imgSrc={`${imgProfile}`}
                        setAddedPost={setAddedPost}
                    />
                </section>
                <section className="feedpage-thread__section">
                    <header className="feedpage-thread__header">
                        <h2 className="feedpage-thread__section-title">Les dernières publications</h2>
                    </header>
                    <Posts
                        addedPost={addedPost}
                        setAddedPost={setAddedPost}
                        userImgProfile={`${imgProfile}`}
                    />
                </section>
            </main>
            <Footer/>
        </>
    )
}

// --- EXPORTS ---
export default Feed;