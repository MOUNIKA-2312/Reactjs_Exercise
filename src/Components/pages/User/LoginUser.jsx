import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginSignUp.css";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate input fields
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    // Send the login data to the backend API
    try {
      const response = await fetch("https://localhost:7117/login", { // Ensure correct endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const result = await response.json(); // Parse the response from the backend

      if (response.ok) {
        // If login is successful, navigate to the homepage
        alert(result.message || "Login successful");
        navigate(result.redirectUrl || "/login/User/homepage"); // Redirect based on the backend's response
      } else {
        // If credentials are incorrect, show the error message returned by the backend
        alert(result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">User Login</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <input
            type="email"
            id="email"
            placeholder="Enter E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"  // Optional: for styling purposes
          />
        </div>

        <div className="input">
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"  // Optional: for styling purposes
          />
        </div>
      </div>

      <div className="forgot-password">
        Forget Password? <span>Click Here</span>
      </div>

      <div className="submit-container">
        <button type="button" className="submit" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginUser;
