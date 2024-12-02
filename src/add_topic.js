import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const addTopic = () => {
  const handleSubmit = async (e) => {};

  return (
    <div className="LoginTab">
      <h2>Welcome, Login</h2>
      <input
        type="text"
        className="CenteredInputField"
        placeholder="Email or Username"
      />
      <input
        type="password"
        className="CenteredInputField"
        placeholder="Password"
      />
      <button onClick={handleSubmit} className="LoginButton">
        Login
      </button>

      <p className="signup-text">Don't have an account? Click here</p>
    </div>
  );
};

export default addTopic;
