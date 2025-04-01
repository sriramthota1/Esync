import React from 'react';


import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaUserMd, FaCalendarCheck, FaPills, FaChartLine, FaShieldAlt, FaLaptopMedical } from 'react-icons/fa';
import './Dashboard.css';
//sidebar arranging
const modules = [
  { name: "User Management", icon: <FaUserMd />, description: "Manage patient and provider profiles." },
  { name: "Appointments", icon: <FaCalendarCheck />, description: "Schedule and manage doctor appointments." },
  { name: "Prescriptions", icon: <FaPills />, description: "Track medications and handle prescriptions." },
  { name: "Health Analytics", icon: <FaChartLine />, description: "AI-driven insights and health trends." },
  { name: "Security & Compliance", icon: <FaShieldAlt />, description: "HIPAA-compliant data protection." },
  { name: "EHR Integration", icon: <FaLaptopMedical />, description: "Access and manage health records securely." }
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>HealthSync</h1>
        <div className="profile" onClick={() => navigate('/profile')}>
          <FaUser className="profile-icon" />
          <span>Profile</span>
        </div>
      </div>
      <div className="modules">
        {modules.map((module, index) => (
          <div className="card" key={index} onClick={() => alert(`Opening ${module.name} Module...`)}>
            <div className="icon">{module.icon}</div>
            <h2>{module.name}</h2>
            <p>{module.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
