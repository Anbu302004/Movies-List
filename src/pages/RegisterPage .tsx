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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: name,
      phone: mobileNumber,
      device: "chrome",
      referrer: "TEST",
    };

    try {
      const response = await moviesApiClient.post("/register", payload);
      console.log("API response:", response.data);

      const token = response?.data?.results?.token;
      const userId = response?.data?.results?.user?.id;

      if (token) {
        // ✅ Save token in cookies and localStorage
        Cookies.set("token", token, { expires: 7, path: "/" });
        localStorage.setItem("token", token);
        if (userId) {
          localStorage.setItem("user_id", userId);
        }

        console.log("Token stored:", token);

        // ✅ Use token as Bearer token to fetch user profile
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        try {
          const profileResponse = await moviesApiClient.get("/profile", { headers });
          console.log("User Profile:", profileResponse.data);
        } catch (profileError) {
          console.error("Error fetching profile:", profileError);
        }

        navigate("/otp", {
          state: {
            name: name,
            mobileNumber: mobileNumber, 
            device: "chrome",
          },
        });
      } else {
        console.error("Token is undefined");
        alert("Something went wrong. Please try again.");
      }

    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
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
            <button type="submit" className="red-button">Next</button>
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
