// --- IMPORTS ---
import React, {useState} from "react";
import axios from "axios";
// Import de composants :
import LogInForm from "./LogInForm";

// --- COMPOSANT : SignUpForm ---
const SignUpForm = () => {
    // Déclaration des variables
    let errorCounter = 0;

    // Déclaration des regex
    const regexName = /^[a-zàâäéèêëîïöôüûù ,.'-]{2,30}$/i;
    const regexEmail = /^\S+@\S+\.\S+$/;
    const regexPassword = /^[A-Za-z0-9]\w{8,29}$/;

    // Déclaration des états
    const [formSubmit, setFormSubmit] = useState(false);
    const [userData, setUserData] = useState({
        userFirstname: "",
        userLastname: "",
        userEmail: "",
        userPassword: "",
    })
    const {userFirstname, userLastname, userEmail, userPassword} = userData;

    // Déclaration des fonctions
    // Validation des entrées utilisateurs et gestion des erreurs
    // Prénom
    const checkFirstname = (firstname) => {
        // Déclaration de variables :
        let inputFirstnameElement = document.querySelector(".homepage-form__form-input.firstname");
        let labelFirstnameElement = document.querySelector(".homepage-form__form-label.firstname");

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
        let inputLastnameElement = document.querySelector(".homepage-form__form-input.lastname");
        let labelLastnameElement = document.querySelector(".homepage-form__form-label.lastname");

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

    // Email
    const checkEmail = (email) => {
        // Déclaration de variables :
        let inputEmailElement = document.querySelector(".homepage-form__form-input.email");
        let labelEmailElement = document.querySelector(".homepage-form__form-label.email");

        if (!regexEmail.test(email)) {
            errorCounter++;
            inputEmailElement.classList.remove("green-border");
            inputEmailElement.classList.add("red-border");
            labelEmailElement.setAttribute("data-error", "Votre email n'est pas valide");
            if (email === "") {
                labelEmailElement.setAttribute("data-error", "Veuillez remplir la case Email");
            }
        } else {
            inputEmailElement.classList.remove("red-border");
            inputEmailElement.classList.add("green-border");
            labelEmailElement.setAttribute("data-error", "");
        }
    }

    // Mot de passe
    const checkPassword = (password) => {
        // Déclaration de variables :
        const inputPasswordElement = document.querySelector(".homepage-form__form-input.password");
        const labelPasswordElement = document.querySelector(".homepage-form__form-label.password");

        if (!regexPassword.test(password)) {
            errorCounter++;
            inputPasswordElement.classList.remove("green-border");
            inputPasswordElement.classList.add("red-border");
            labelPasswordElement.setAttribute("data-error", "Votre mot de passe n'est pas valide");
            if (password === "") {
                labelPasswordElement.setAttribute("data-error", "Veuillez remplir la case Mot de passe");
            } else if (password.length <= 8 || password.length >= 30) {
                labelPasswordElement.setAttribute("data-error", "Le mot de passe doit avoir entre 9 et 30 caractères");
            }
        } else {
            inputPasswordElement.classList.add("green-border");
            labelPasswordElement.setAttribute("data-error", "");
        }
    }

// Inscription du nouvel utilisateur à l'application
    const handleRegister = async (e) => {
        // Empecher le rafraichissement de la page lors de la soumission du formulaire
        e.preventDefault();

        // Gestion des erreurs et validation des entrées de l'utilisateur
        checkFirstname(userFirstname);
        checkLastname(userLastname);
        checkEmail(userEmail);
        checkPassword(userPassword);

        if (errorCounter === 0) {
            // Alors faire la requête POST à l'API avec axios
            await axios({
                method: "post",
                url: "http://localhost:5150/api/auth/signup",
                header: {"Content-type": "application/JSON"},
                data: {
                    firstname: userFirstname,
                    lastname: userLastname,
                    email: userEmail,
                    password: userPassword,
                },
            })
                .then((res) => {
                    // Si le backend renvoie une erreur :
                    if (res.data.errors) {
                        // Envoyer le message texte erreur
                        document.querySelector(".homepage-form__form-input.email").classList.remove("green-border");
                        document.querySelector(".homepage-form__form-input.email").classList.add("red-border");
                        document.querySelector(".homepage-form__form-label.email").setAttribute("data-error", res.data.errors.email);
                    } else {
                        // Sinon tout est OK, changer l'état
                        setFormSubmit(true);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            // Faire apparaitre un message sur le formulaire pour signaler qu'une erreur s'est produite
        }
    }

    return (
        <>
            {formSubmit ? (
                <>
                    <p className="homepage-message__success">Utilisateur créé avec succès ! Vous pouvez vous
                        connecter.</p>
                    <LogInForm/>
                </>
            ) : (
                <form className="homepage-form__form" method="post" id="signup-form"
                      name="signup-form" data-error="">
                    <label className="homepage-form__form-label signup-form firstname" htmlFor="firstname"
                           data-error="">Prénom</label>
                    <input className="homepage-form__form-input signup-form firstname" type="text" name="firstname"
                           placeholder="Votre prénom" id="firstname"
                           onChange={(e) => setUserData({...userData, userFirstname: e.target.value})}
                           value={userFirstname}/>
                    <label className="homepage-form__form-label signup-form lastname" htmlFor="lastname"
                           data-error="">Nom</label>
                    <input className="homepage-form__form-input signup-form lastname" type="text" name="lastname"
                           placeholder="Votre nom" id="lastname"
                           onChange={(e) => setUserData({...userData, userLastname: e.target.value})}
                           value={userLastname}/>
                    <label className="homepage-form__form-label signup-form email" htmlFor="email"
                           data-error="">Email</label>
                    <input className="homepage-form__form-input signup-form email" type="email" name="email"
                           placeholder="prenom-nom@groupomania.com" id="email"
                           onChange={(e) => setUserData({...userData, userEmail: e.target.value})} value={userEmail}/>
                    <label className="homepage-form__form-label signup-form password" htmlFor="password" data-error="">Mot
                        de passe</label>
                    <input className="homepage-form__form-input signup-form password" type="password" name="password"
                           placeholder="Votre mot de passe confidentiel" id="password"
                           onChange={(e) => setUserData({...userData, userPassword: e.target.value})}
                           value={userPassword}/>
                    <button className="homepage-form__form-button signup-form" onClick={handleRegister}>Inscription
                    </button>
                </form>
            )}
        </>
    )
}

// --- EXPORTS ---
export default SignUpForm;