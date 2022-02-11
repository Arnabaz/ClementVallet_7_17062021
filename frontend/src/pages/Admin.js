// --- IMPORTS ---
import React from "react";
import {Navigate} from "react-router-dom";
// Import des composants
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import UsersList from "../components/UsersList"

// --- COMPOSANT : PAGE Admin ---
const Admin = () => {
    const userRole = JSON.parse(localStorage.getItem("user")).isAdmin;

    return (
        <>
            {userRole ?
                <>
                    <Header/>
                    <main className="adminpage-main">
                        <section className="adminpage-section">
                            <header className="adminpage-header">
                                <h1>Liste des utilisateurs</h1>
                            </header>
                            <UsersList/>
                        </section>
                    </main>
                    <Footer/>
                </> : <Navigate to="/feed"/>}
        </>
    )
}

// --- EXPORT ---
export default Admin;