// --- IMPORTS ---
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

// --- COMPOSANT : UserProfile ---
const UserProfile = ({userData, userRole}) => {
    // Déclaration des variables :
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const token = JSON.parse(localStorage.getItem("user")).token;

    let errorCounter = 0; // Compteur d'erreurs (0 = formulaire validé | > 0 = formulaire non validé)

    let params = useParams();

    const navigate = useNavigate();

    // Déclaration des regex
    const regexName = /^[a-zàâäéèêëîïöôüûù ,.'-]{2,30}$/i; // Regex pour le prénom et le nom

    // Déclaration des states
    const [formSubmit, setFormSubmit] = useState(false);
    const [userUpdateData, setUserUpdateData] = useState({
        firstname: null,
        lastname: null,
        imgProfile: null,
    });
    const {firstname, lastname, imgProfile} = userUpdateData
    const [userIsNotModified, setUserIsNotModified] = useState(false)
    const [userIdP, setUserIdP] = useState(userId); // Pour récupérer de l'userId dans les paramètres de l'URL

    // Mise à jour des states :
    // Pour récupérer de l'userId dans les paramètres de l'URL
    useEffect(() => {
        params.userId ?
            setUserIdP(params.userId)
            :
            setUserIdP(userId)
    }, [params.userId, userId])

    // Déclaration des fonctions :
    // Ajout d'une image dans le post à créer et récupération du nom de l'image uploadée pour affichage à côté du bouton image
    const handleImgProfile = (e) => {
        setUserUpdateData({...userUpdateData, imgProfile: e.target.files[0]})
    }

    // Retirer l'image dans le formulaire de création du post
    const cancelImgProfile = () => {
        setUserUpdateData({...userUpdateData, imgProfile: null,})
    }

    // Validation des entrées utilisateurs et gestion des erreurs
    // Prénom
    const checkFirstname = (firstname) => {
        // Déclaration de variables :
        let inputFirstnameElement = document.querySelector(".profilepage-form__input.firstname");
        let labelFirstnameElement = document.querySelector(".profilepage-form__label.firstname");

        if (!regexName.test(firstname)) {
            inputFirstnameElement.classList.remove("green-border");
            inputFirstnameElement.classList.add("red-border");
            labelFirstnameElement.setAttribute("data-error", "Votre prénom ne doit contenir que des lettres");
            errorCounter++;
            if (firstname === "") {
                labelFirstnameElement.setAttribute("data-error", "Veuillez remplir la case Prénom");
            } else if (firstname.length >= 30 || firstname.length <= 2) {
                labelFirstnameElement.setAttribute("data-error", "Votre prénom doit contenir entre 2 et 30 caractères");
            }
        } else {
            inputFirstnameElement.classList.remove("red-border");
            inputFirstnameElement.classList.add("green-border");
            labelFirstnameElement.setAttribute("data-error", "");
        }
    }

    // Nom
    const checkLastname = (lastname) => {
        // Déclaration de variable :
        let inputLastnameElement = document.querySelector(".profilepage-form__input.lastname");
        let labelLastnameElement = document.querySelector(".profilepage-form__label.lastname");

        if (!regexName.test(lastname)) {
            inputLastnameElement.classList.remove("green-border");
            inputLastnameElement.classList.add("red-border");
            labelLastnameElement.setAttribute("data-error", "Votre nom ne doit contenir que des lettres");
            errorCounter++;
            if (lastname === "") {
                labelLastnameElement.setAttribute("data-error", "Veuillez remplir la case Nom");
            } else if (lastname.length >= 30 || lastname.length <= 2) {
                labelLastnameElement.setAttribute("data-error", "Votre nom doit contenir entre 2 et 30 caractères");
            }
        } else {
            inputLastnameElement.classList.remove("red-border");
            inputLastnameElement.classList.add("green-border");
            labelLastnameElement.setAttribute("data-error", "");
        }
    }

    // Mise à jour des données utilisateurs
    const handleNewUserData = (e) => {
        // Empecher la page de se rafraichir après chaque validation du formulaire
        e.preventDefault();
        if (firstname || lastname || imgProfile) {
            let formData = new FormData(); // Création de l'objet formData (contient les données à envoyer à l'API)

            // Gestion des erreurs et validation des entrées de l'utilisateur
            checkFirstname(firstname);
            checkLastname(lastname);

            // Si tout est OK, gérer ce qui est envoyé à l'API
            if (errorCounter === 0) {
                if (firstname) {
                    formData.append("firstname", firstname)
                }
                if (lastname) {
                    formData.append("lastname", lastname)
                }
                if (imgProfile) {
                    formData.append("profile_image", imgProfile, `img_profile_${userIdP}`)
                }
                // Requête PUT à l'API avec axios
                axios({
                    method: "put",
                    url: `http://localhost:5150/api/user/${userIdP}`,
                    headers: {"Authorization": `Bearer ${token}`},
                    data: formData,
                })
                    .then((res) => {
                        setUserUpdateData({
                            firstname: null,
                            lastname: null,
                            imgProfile: null,
                        })
                        setFormSubmit(true);
                        setUserIsNotModified(false);

                    })
                    .catch((err) => console.log({err}))
            }
        } else {
            setUserIsNotModified(true)
        }
    }

// Suppression du compte utilisateur
    const handleUserDeleteAccount = (e) => {
        e.preventDefault();
        if (window.confirm("Voulez-vous vraiment supprimer le compte ?")) {
            // Requête DELETE à l'API aec axios
            axios({
                method: "delete",
                url: `http://localhost:5150/api/user/${userIdP}`,
                headers: {"Authorization": `Bearer ${token}`},
            })
                .then(() => {
                    if (!params.userId) {
                        localStorage.clear();
                        navigate("/");
                        console.log("L'utilisateur a bien été supprimé")
                    } else if (params.userId && userRole === 1) {
                        navigate("/feed");
                    }
                })
                .catch((err) => console.log(err))
        } else {
            console.log("Le compte utilisateur n'a pas été supprimé")
        }
    }

    return (
        <>
            <form className="profilepage-form" action="" method="post" encType="multipart/formData">
                <label className="profilepage-form__label img" htmlFor="file">
                    <img src={`http://localhost:5150/images/profiles/${userData.img_profile}`}
                         alt={`avatar de ${userData.firstname} ${userData.lastname}`}
                         className="profilepage-form__img"/>
                </label>
                <input className="profilepage-form__input img display-none" type="file" name="file" id="file"
                       accept=".jpg, .jpeg, .png, .webp" onChange={(e) => handleImgProfile(e)}
                />
                {imgProfile ? <><p className="profilepage-form__img-message">Photo prête à être postée. Nom du fichier
                    : {imgProfile.name}</p>
                    <button className="profilepage-form__img-cancel" onClick={cancelImgProfile}>Retirer la photo
                    </button>
                </> : null}
                <label className="profilepage-form__label firstname" htmlFor="firstname"
                       data-error="">Prénom</label>
                <input className="profilepage-form__input firstname" type="firstname" name="firstname"
                       id="firstname"
                       onChange={(e) => setUserUpdateData({...userUpdateData, firstname: e.target.value,})}
                       defaultValue={userData.firstname}
                />
                <label className="profilepage-form__label lastname" htmlFor="lastname" data-error="">Nom</label>
                <input className="profilepage-form__input lastname" type="lastname" name="lastname"
                       id="lastname"
                       onChange={(event) => setUserUpdateData({...userUpdateData, lastname: event.target.value,})}
                       defaultValue={userData.lastname}
                />
                <label className="profilepage-form__label email" htmlFor="email">Email</label>
                <input className="profilepage-form__input email" type="email" name="email"
                       id="email"
                       disabled placeholder={userData.email}/>
                <button className="profilepage-form__button" onClick={handleNewUserData}>Enregistrer</button>
            </form>
            {userIsNotModified ? (
                <p className="profilepage-form__update-error">Pour modifier les données de l'utilisateur, veuillez
                    modifier le prénom et/ou nom et/ou la photo de profil</p>) : null}
            {formSubmit ? (
                <>
                    <p className="success-message">Vos modifications ont été enregistrées avec succès !</p>
                    <Link to="/feed" className="return-link">Retour vers le fil d'actualités</Link>
                </>
            ) : null }
                <p className="profilepage-link__delete" onClick={handleUserDeleteAccount}>Supprimer le compte</p>

        </>
    )
}

// --- EXPORT ---
export default UserProfile;