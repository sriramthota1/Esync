import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import Appointments from "./components/Appointments";
import Prescriptions from "./components/Prescriptions";
import Analytics from "./components/Analytics";
import Security from "./components/Security";
import EHR from "./components/EHR";
import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="app-container">
      {isAuthenticated && <Sidebar setIsAuthenticated={setIsAuthenticated} />}
      <div className="main-content">
        <Routes>
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} />
          <Route path="/appointments" element={isAuthenticated ? <Appointments /> : <Navigate to="/auth" />} />
          <Route path="/prescriptions" element={isAuthenticated ? <Prescriptions /> : <Navigate to="/auth" />} />
          <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/auth" />} />
          <Route path="/security" element={isAuthenticated ? <Security /> : <Navigate to="/auth" />} />
          <Route path="/ehr" element={isAuthenticated ? <EHR /> : <Navigate to="/auth" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
