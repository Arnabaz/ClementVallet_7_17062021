// --- IMPORTS ---
import React, {useState, useEffect} from "react";
import {AuthContext} from "./components/AppContext";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// Import des composants
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import RequireAuth from "./components/RequireAuth"

// --- APP ---
const App = () => {
// Déclaration de variables :
  let token = localStorage.getItem("token");

  // Déclaration de states :
  const [authContext, setAuthContext] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthContext(true);
    } else {
      setAuthContext(false)
    }
  }, []);

  return (
      <AuthContext.Provider value={{authContext, setAuthContext}}>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route element={<RequireAuth/>}>
              <Route path="/feed" element={<Feed/>}/>
              <Route path="/profile" element={<Profile/>}>
                <Route path="/profile/:userId" element={<Profile/>}/>
              </Route>
              <Route path="/admin" element={<Admin/>}/>
            </Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
  )
}


// --- EXPORT ---
export default App;