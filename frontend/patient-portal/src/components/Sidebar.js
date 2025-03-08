import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  if (!setIsAuthenticated) return null; // Prevent rendering errors

  const handleLogout = () => {
    console.log("🔴 Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");

    // Update state to remove Sidebar
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("storage"));

    navigate("/auth");
  };

  return (
    <div className="sidebar">
      <div>
        <h2 className="logo">Health System</h2>
        <ul className="menu">
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/appointments")}>Appointments</li>
          <li onClick={() => navigate("/prescriptions")}>Prescriptions</li>
          <li onClick={() => navigate("/analytics")}>Analytics</li>
          <li onClick={() => navigate("/security")}>Security</li>
          <li onClick={() => navigate("/ehr")}>EHR</li>
        </ul>
      </div>
      
      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;