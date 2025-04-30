import React, { useState } from "react";
import { FaUser, FaMobileAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/file_461660ed6ac0dfc9ddfd2e013f5d761d_1713605822.jpg";
import moviesApiClient from "../services/authApiClient";
import "../index.css";
import Cookies from "js-cookie";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanedName = name.trim();
    const cleanedPhone = mobileNumber.trim();

    if (!/^\d{10}$/.test(cleanedPhone)) {
      alert("Please enter a valid 10-digit mobile number.");
      setLoading(false);
      return;
    }

    const payload = {
      name: cleanedName,
      phone: cleanedPhone,
      device: "chrome",
      referrer: "TEST",
    };

    try {
      const response = await moviesApiClient.post("/register", payload);
      const token = response?.data?.results?.token;
      const userId = response?.data?.results?.user?.id;

      if (token) {
        Cookies.set("token", token, { expires: 7, path: "/" });
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", userId);
        localStorage.setItem("user_name", cleanedName);
        localStorage.setItem("user_phone", cleanedPhone);

        navigate("/otp", {
          state: {
            name: cleanedName,
            mobileNumber: cleanedPhone,
            device: "chrome",
          },
        });
      } else {
        alert("Something went wrong. Token not received.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="register-container"
      style={{ backgroundImage: `url(${backgroundImage})`, marginTop: "-70px" }}
    >
      <div className="overlay">
        <div className="register-form">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <button type="submit" className="red-button" disabled={loading}>
              {loading ? "Processing..." : "Next"}
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="signin-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
