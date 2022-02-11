// --- IMPORTS ---
import React from "react";
import {Link} from "react-router-dom";

// --- COMPOSANT : UserCard ---
const UserCard = ({firstname, lastname, imgSrc, userId}) => {

    return (
        <article className="adminpage-usercard">
            <figure className="adminpage-usercard__content">
                <img className="adminpage-usercard__img" src={`http://localhost:5150/images/profiles/${imgSrc}`}
                     alt={`avatar de ${firstname} ${lastname}`}/>
                <h2 className="adminpage-usercard__name">{`${firstname} ${lastname}`}</h2>
                <Link className="adminpage-usercard__profile-link" to={`/profile/${userId}`}>Voir le profil</Link>
            </figure>
        </article>
    )
}

// --- EXPORTS ---
export default UserCard;