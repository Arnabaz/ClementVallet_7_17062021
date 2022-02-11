// --- IMPORTS ---
import React from "react";
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom"
// Import de composants :
import Nav from "./Nav"

// --- COMPOSANT : Header ---
const Header = () => {
    // Déclaration des variables :
    let isHomepage = window.location.pathname === "/" || window.location.pathname === ""; // Variable (booléen) pour savoir si on est sur la page d'accueil ou pas

    return (
        <header className="header">
            {isHomepage ? (
                <Link className="logo__link" to="/">
                    <img className="logo" src={logo} alt="logo de groupomania"/>
                </Link>
            ) : (
                <>
                    <Link className="logo__link" to="/feed">
                        <img className="logo" src={logo} alt="logo de groupomania"/>
                    </Link>
                    <Nav/>
                </>
            )
            }
        </header>
    )
}

// --- EXPORTS ---
export default Header;