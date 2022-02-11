// --- IMPORTS ---
import React, {useState} from "react";
// Import de composants :
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

// --- COMPOSANT : LogForm ---
const LogForm = () => {
    // Déclaration des states
    const [logInModal, setLogInModal] = useState(true); // Par défaut, on affiche le formulaire de connexion
    const [signUpModal, setSignUpModal] = useState(false); // Par défaut, on masque le formulaire d'inscription

    // Déclaration de fonctions
    // Pour basculer entre les 2 formulaires (connexion et inscription)
    const handleModals = (e) => {
        // Si on clique sur Connexion
        if (e.target.id === "connexion") {
            setLogInModal(true); // Afficher le formulaire d'inscription
            setSignUpModal(false); // Masquer le formulaire de connexion
            // Si on clique sur Inscription
        } else if (e.target.id === "inscription") {
            setLogInModal(false); // Masquer le formulaire d'inscription
            setSignUpModal(true); // Afficher le formulaire de connexion
        }
    }

    return (
        <section className="homepage-form">
            <header className="homepage-form__header">
                <hgroup className="homepage-form__header-container">
                    <h2 onClick={handleModals} id="connexion" className={logInModal ? "active-form" : null}>Se
                        connecter</h2>
                    <h2 onClick={handleModals} id="inscription"
                        className={signUpModal ? "active-form" : null}>S'inscrire</h2>
                </hgroup>
            </header>
            {logInModal && <LogInForm/>}
            {signUpModal && <SignUpForm/>}
        </section>
    )
}

// --- EXPORTS ---
export default LogForm;