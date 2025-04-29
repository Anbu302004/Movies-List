import React, { useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import backgroundImage from "../assets/file_461660ed6ac0dfc9ddfd2e013f5d761d_1713605822.jpg";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import moviesApiClient from "../services/authApiClient"; // Assuming you have this client for API calls

const LoginPage: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      mobile_number: mobileNumber,
    };

    try {
      // Make API call to login
      const response = await moviesApiClient.post("/send-otp", payload); 
      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");

      // Navigate to OTP page with state (if needed)
      navigate("/otp", { state: { mobileNumber } });
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${backgroundImage})`, marginTop: "-70px" }}
    >
      <div className="overlay">
        <div className="login-form">
          <h2>SIGN IN</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaMobileAlt className="icon" />
              <input
                type="tel"
                placeholder="+91 | Mobile number *"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="red-button">Next</button>
          </form>
          <p>
            New User?{" "}
            <Link to="/register" className="register-link">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
