import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {};

  return (
    <div className="LoginTab">
      <h2>Welcome, Login</h2>
      <input
        type="text"
        className="CenteredInputField"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Email or Username"
      />
      <input
        type="password"
        className="CenteredInputField"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSubmit} className="LoginButton">
        Login
      </button>

      <p onClick={handleClick} className="signup-text">
        Don't have an account? Click here
      </p>
    </div>
  );
};

export default Login;
