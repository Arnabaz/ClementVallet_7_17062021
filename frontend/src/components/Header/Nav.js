import React, {useContext} from "react"
import {AuthContext} from "../AppContext";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSignOutAlt, faPortrait, faToolbox} from "@fortawesome/free-solid-svg-icons";


const Nav = () => {
    // Déclaration de variables :
    const userRole = JSON.parse(localStorage.getItem("user")).isAdmin;
    const {setAuthContext} = useContext(AuthContext);

    // Déclaration de fonctions :
    // Pour déplier/replier le menu de navigation du header
    const toggleNavigation = () => {
        const menuElement = document.querySelector(".menu-navbar");

        if (menuElement.classList.contains("folded")) {
            menuElement.classList.replace("folded", "unfolded");
        } else {
            menuElement.classList.replace("unfolded", "folded");
        }
    }

    // Pour se déconnecter de l'application
    const handleLogOut = () => {
        setAuthContext(false);
        localStorage.clear()
    }

    return (
        <>
            <FontAwesomeIcon icon={faBars} className="bars-button" onClick={toggleNavigation}/>
            <nav className="menu-navbar folded">
                <ul className="menu-items">
                    <li className="menu-item">
                        <Link to="/profile">
                            <FontAwesomeIcon icon={faPortrait} className="portrait-icon"/>
                            Votre profil
                        </Link>
                    </li>
                    {userRole ?
                        <li className="menu-item">
                            <Link to="/admin">
                                <FontAwesomeIcon icon={faToolbox} className="portrait-icon"/>
                                Page Admin
                            </Link>
                        </li>
                        : null}
                    <li className="menu-item" onClick={handleLogOut}>
                        <Link to="/">
                            <FontAwesomeIcon icon={faSignOutAlt} className="exit-icon"/>
                            Se déconnecter
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Nav;