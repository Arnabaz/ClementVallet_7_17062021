// --- IMPORTS ---
import React, {useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../AppContext";
import {useNavigate} from "react-router-dom";

// --- COMPOSANT : LogInForm ---
const LogInForm = () => {
    // Déclaration de variables
    const {setAuthContext} = useContext(AuthContext);

    const navigate = useNavigate();

    let errorCounter = 0;

    // Déclaration des regex
    const regexEmail = /^\S+@\S+\.\S+$/;
    const regexPassword = /^[A-Za-z0-9]\w{8,29}$/;

    // Déclaration des states
    const [user, setUser] = useState({
        userEmail: "",
        userPassword: ""
    });
    const {userEmail, userPassword} = user;

    // Déclaration de fonctions
    // Validation des entrées utilisateurs et gestion des erreurs
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
        } else {
            inputPasswordElement.classList.add("green-border");
            labelPasswordElement.setAttribute("data-error", "");
        }
    }

    // Connexion de l'utilisateur à l'application
    const handleLogin = (e) => {
        // Empecher le rafraichissement de la page lors de la soumission du formulaire
        e.preventDefault();

        //Gestion des erreurs et validation des entrées de l'utilisateur
        checkEmail(userEmail);
        checkPassword(userPassword);

        // Si tout est OK, on passe la requête à l'API
        if (errorCounter === 0) {
            // Requête POST à l'API
            axios({
                method: "post",
                url: "http://localhost:5150/api/auth/login",
                data: {
                    email: userEmail,
                    password: userPassword,
                },
            })
                .then((res) => {
                    document.getElementById("login-form").setAttribute("data-error", "");
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    localStorage.setItem("user", JSON.stringify(res.data));
                    setAuthContext(true)
                    navigate("/feed");
                })
                .catch((err) => {
                    setAuthContext(false)
                    console.log(err)
                    document.getElementById("login-form").setAttribute("data-error", "Les identifiants sont incorrects. Veuillez réessayer svp.");
                })
        }
    }

    return (
        <form className="homepage-form__form" method="post" id="login-form" name="login-form"
              data-error="">
            <label className="homepage-form__form-label login-form email" htmlFor="email" data-error="">Email</label>
            <input className="homepage-form__form-input login-form email" type="email" name="email"
                   placeholder="votre-email@groupomania.com" id="email"
                   onChange={(e) => setUser({...user, userEmail: e.target.value})} value={userEmail}/>
            <label className="homepage-form__form-label login-form password" htmlFor="password" data-error="">Mot de
                passe</label>
            <input className="homepage-form__form-input login-form password" type="password" name="password"
                   placeholder="Tapez votre mot de passe ici" id="password"
                   onChange={(e) => setUser({...user, userPassword: e.target.value})} value={userPassword}/>
            <button className="homepage-form__form-button login-form" onClick={handleLogin}>Connexion</button>
        </form>
    )
}

// --- EXPORTS ---
export default LogInForm;