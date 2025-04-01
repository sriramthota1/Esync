

import React, { useState } from "react";
import axios from "axios";
import './Appointments.css';


function Appointments(){
  const [appointmentType, setAppointmentType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(1); // Step 1: Select Type, Step 2: Select Date & Time

  const handleTypeSelect = (type) => {
    setAppointmentType(type);
    setStep(2); // Move to date selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8080/book-appointment", {
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
      });

      alert("✅ Appointment booked successfully!");
      console.log("Response:", response.data);

      // Reset form after use
      setAppointmentType("");
      setSelectedDate("");
      setSelectedTime("");
      setStep(1);
    } catch (error) {
      console.error("❌ Booking Error:", error);
      alert(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="appointment-container">
      <h2>📅 Book an Appointment</h2>

      {step === 1 && (
        <div>
          <h3>Select Appointment Type:</h3>
          <button onClick={() => handleTypeSelect("General Checkup")}>General Checkup</button>
          <button onClick={() => handleTypeSelect("Dental")}>Dental</button>
          <button onClick={() => handleTypeSelect("Cardiology")}>Cardiology</button>
          <button onClick={() => handleTypeSelect("Pediatrics")}>Pediatrics</button>
          <p>🔹 You have selected: <strong>{appointmentType || "None"}</strong></p>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <h3>📆 Select Date & Time:</h3>
          
          <label>Date:</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />

          <label>Time:</label>
          <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required />

          <button type="submit">✅ Confirm Appointment</button>
        </form>
      )}
    </div>
  );
}

export default Appointments;
