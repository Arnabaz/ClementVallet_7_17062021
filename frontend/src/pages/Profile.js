// --- IMPORTS ---
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom"
import axios from "axios";
// Import des composants
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import UserProfile from "../components/UserProfile/index";

// --- COMPOSANT : PAGE Profile ---
const Profile = () => {
    // Déclaration des variables :
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const userRole = JSON.parse(localStorage.getItem("user")).isAdmin;
    const token = JSON.parse(localStorage.getItem("user")).token;

    let params = useParams();

    // Déclaration de states :
    const [userIdP, setUserIdP] = useState(); // Pour récupérer de l'userId dans les paramètres de l'URL
    const [userData, setUserData] = useState({}); // Pour récupérer les données de l'utilisateur

    // Déclaration des fonctions
    // Pour récupérer les données de l'utilisateur (pour affichage du profil utilisateur)
    useEffect(() => {
            if (userRole) {
                // Si l'URL contient un userId en paramètre, on met cet userId dans la requête get à l'API
                params.userId ?
                    setUserIdP(params.userId)
                    :
                    // Sinon on récupère le userId de l'admin et on affiche son profil
                    setUserIdP(userId)
                // Si l'utilisateur n'est pas admin, il n'aura accès qu'à son profil (si on rentre un paramètre en URL, on affiche son profil)
            } else if (!userRole) {
                setUserIdP((userId))
            }
        axios({
                method: "get",
                url: `http://localhost:5150/api/user/${userIdP}`,
                headers: {"Authorization": `Bearer ${token}`},
            },
        )
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => console.log(error))
    }, [userIdP,userData]);

    return (
        <>
            <Header/>
            <main className="profilepage-main">
                <section className="profilepage-section">
                    <header>
                        <h1 className="profilepage-title">{params.userId && userRole ? `Profil de ${userData.firstname} ${userData.lastname}` : `Votre profil`}</h1>
                    </header>
                    <UserProfile
                        userData={userData}
                    />
                </section>
            </main>
            <Footer/>
        </>


    )

}


// --- EXPORT ---
export default Profile;