import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie"; 
import moviesApiClient from "../services/authApiClient";

const OtpPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, mobileNumber } = location.state || {
    name: "Test aa",
    mobileNumber: "7000000002",
    device: "chrome",
  };

  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(15 * 60);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const isChrome =
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome) {
      alert("Please use Google Chrome for the best experience.");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpDigits.join("");

    if (otp.length !== 4) {
      alert("Please enter the full 4-digit OTP.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", mobileNumber);
      formData.append("otp", otp);
      formData.append("device", "web");

      const response = await moviesApiClient.post("/login-with-otp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { token } = response.data;
      Cookies.set("token", token); 
      navigate("/browse", {state: { name: name }}); 
    } catch (error: any) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleResendCode = () => {
    alert(`OTP sent again to ${mobileNumber}`);
    setTimer(15 * 60);
    setOtpDigits(["", "", "", ""]);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="otp-container" style={{ marginTop: "-70px" }}>
      <div className="otp-overlay">
        <div className="otp-form">
          <h2>Enter the 4-digit code</h2>
          <p>Code sent to {mobileNumber}. Expires in 15 minutes.</p>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  autoFocus={index === 0}
                  className="otp-input"
                />
              ))}
            </div>
            <div style={{ marginTop: "10px" }}>
              <button type="submit" className="login-button">
                Proceed
              </button>
            </div>
          </form>
          <p>
            Didn’t receive the code? <br />
            <span
              style={{ color: "#cc1e24", cursor: "pointer" }}
              onClick={handleResendCode}
            >
              Resend Code
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
