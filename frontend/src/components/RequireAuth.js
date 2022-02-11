// --- IMPORTS ---
import React, {useContext, useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "./AppContext";

// --- COMPOSANT : RequireAuth ---
const RequireAuth = () => {
    // Déclaration de variables :
    let token = localStorage.getItem("token");

    const {authContext, setAuthContext} = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            setAuthContext(true);
        } else {
            setAuthContext(false)
        }
    }, []);

    return (
        <>
            {authContext || token ?
                <Outlet/> : <Navigate to="/"/>}
        </>
    )
}

// --- EXPORT ---
export default RequireAuth;