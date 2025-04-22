import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Auth({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (!setIsAuthenticated) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = isLogin ? "http://localhost:8080/login" : "http://localhost:8080/register";

    console.log("🔄 Sending request to:", endpoint, "with data:", { username, password });

    try {
      const response = await axios.post(endpoint, { username, password });

      console.log("✅ Response:", response.data);#token is assigned
      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);

        setIsAuthenticated(true);
        window.dispatchEvent(new Event("storage"));

        navigate("/dashboard");
      } else {
        alert("🎉 Account Created! Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response);
      alert(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Health Sync</h1> {/* ✅ Apply new font */}
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Create Account"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
         <input
            type="mail"
            placeholder="Enter your Mail"
            value={Mail}
            onChange={(e) => setmail(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "New user? Create an account" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Auth;
