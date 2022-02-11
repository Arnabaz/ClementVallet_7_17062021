// --- IMPORTS ---
import React from "react";
// Import des composants :
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LogForm from "../components/LogForm";

// --- COMPOSANT : PAGE Home
const Home = () => {

    return (
        <>
            <Header/>
            <main className="homepage-main">
                <header className="homepage-header">
                    <h1 className="homepage-title">Bienvenue sur le réseau social de Groupomania</h1>
                </header>
                <LogForm/>
            </main>
            <Footer/>
        </>
    );
}

// --- EXPORTS ---
export default Home;