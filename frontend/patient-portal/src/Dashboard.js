import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles.css"; // Ensure styles are applied

const API_URL = "http://localhost:8080"; 

const Dashboard = ({ onLogout }) => {
    const [activePage, setActivePage] = useState("home");
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Unauthorized. Please log in.");
                return;
            }

            // Fetch user details (Assuming backend has an endpoint `/me`)
            try {
                const response = await fetch(`${API_URL}/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (data.name) {
                    setUserName(data.name);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Sidebar Navigation */}
            <div className="sidebar">
                <h2 className="sidebar-title">Menu</h2>
                <button className={`sidebar-btn ${activePage === "home" ? "active" : ""}`} onClick={() => setActivePage("home")}>
                    Home
                </button>
                <button className={`sidebar-btn ${activePage === "schedule" ? "active" : ""}`} onClick={() => setActivePage("schedule")}>
                    Schedule
                </button>
                <button className={`sidebar-btn ${activePage === "patients" ? "active" : ""}`} onClick={() => setActivePage("patients")}>
                    Patients
                </button>
                <button className={`sidebar-btn ${activePage === "prescriptions" ? "active" : ""}`} onClick={() => setActivePage("prescriptions")}>
                    Prescriptions
                </button>
                <button className="sidebar-btn logout" onClick={onLogout}>
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {activePage === "home" && <HomePage userName={userName} />}
                {activePage === "schedule" && <SchedulePage />}
                {activePage === "patients" && <PatientsPage />}
                {activePage === "prescriptions" && <PrescriptionsPage />}
            </div>
        </div>
    );
};

/* ✅ Home Page */
const HomePage = ({ userName }) => (
    <div className="home-container">
        <h1>Welcome, {userName}! 👋</h1>
        <p>Quick access:</p>
        <div className="quick-links">
            <button className="quick-btn"> Schedule Appointment</button>
            
            <button className="quick-btn"> View Patients</button>
            <button className="quick-btn">Check Prescriptions</button>
        </div>
    </div>
);

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
      fetch(`${API_URL}/patients`)
          .then((res) => res.json())
          .then((data) => setPatients(data));
  }, []);

  return (
      <div className="patients-container">
          <h1><span role="img" aria-label="doctor">🧑‍⚕️</span> Patients List</h1>
          {patients.length > 0 ? (
              <ul>
                  {patients.map((p) => (
                      <li key={p.id}>{p.name} - {p.email}</li>
                  ))}
              </ul>
          ) : (
              <p>No patients found.</p>
          )}
      </div>
  );
};

/* ✅ Schedule Page */
const SchedulePage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
      fetchAppointments();
  }, []);

  const fetchAppointments = () => {
      fetch(`${API_URL}/appointments`)
          .then((res) => res.json())
          .then((data) => setAppointments(data));
  };

  const handleBookAppointment = () => {
      fetch(`${API_URL}/book-appointment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, time }),
      })
          .then(() => {
              alert("Appointment booked successfully!");
              fetchAppointments();
          })
          .catch(() => alert("Error booking appointment"));
  };

  return (
      <div className="schedule-container">
        <h1><span role="img" aria-label="calendar">📅</span> Schedule Appointments</h1>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input" />
          <button onClick={handleBookAppointment} className="btn">Book Appointment</button>

          <h2>Scheduled Appointments</h2>
          <ul>
              {appointments.map((a) => (
                  <li key={a.id}>{a.date} at {a.time}</li>
              ))}
          </ul>
      </div>
  );
};

/* ✅ Prescriptions Page */
const PrescriptionsPage = () => {
  const [file, setFile] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
      fetchPrescriptions();
  }, []);

  const fetchPrescriptions = () => {
      fetch(`${API_URL}/prescriptions`)
          .then((res) => res.json())
          .then((data) => setPrescriptions(data));
  };

  const handleUpload = () => {
      const formData = new FormData();
      formData.append("file", file);

      fetch(`${API_URL}/upload-prescription`, {
          method: "POST",
          body: formData,
      })
          .then(() => {
              alert("File uploaded successfully!");
              fetchPrescriptions();
          })
          .catch(() => alert("Error uploading file"));
  };
return (
      <div className="prescriptions-container">
        
          <h1>Upload & View Prescriptions</h1>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="input" />
          <button onClick={handleUpload} className="btn">Upload</button>

          <h2>Prescription Files</h2>
          <ul>
              {prescriptions.map((p) => (
                  <li key={p.id}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer">{p.filename}</a>
                  </li>
              ))}
          </ul>
      </div>
  );
};
export default Dashboard;
