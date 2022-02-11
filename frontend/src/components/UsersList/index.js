// --- IMPORTS ---
import React, {useEffect, useState} from "react";
import axios from "axios";
// Import de composants :
import UserCard from "./UserCard";

// --- COMPOSANT : UsersList ---
const UsersList = () => {
    // Déclaration de variables :
    const token = JSON.parse(localStorage.getItem("user")).token;

    // Déclaration des state :
    const [usersData, setUsersData] = useState([]);

    // Récupération de la liste des utilisateurs
    useEffect(() => {
        // Requête GET à l'API avec axios
        axios({
                method: "get",
                url: `http://localhost:5150/api/user/`,
                headers: {"Authorization": `Bearer ${token}`},
            },
        )
            .then((response) => {
                setUsersData(response.data);
            })
            .catch((error) => console.log(error))
    }, [token]);

    return (
        <>
            {usersData.map((data) => (
                <UserCard
                    firstname={data.firstname}
                    lastname={data.lastname}
                    imgSrc={data.img_profile}
                    userId={data.UID}
                    key={data.UID}
                />
            ))}


        </>
    )
}

// --- EXPORTS ---
export default UsersList;