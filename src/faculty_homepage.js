import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Faculty_Homepage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {};

  return (
    <div className="facultyHome">
      <h2>Home Faculty</h2>
      <button onClick={handleSubmit} className="AboutButton">
        About us
      </button>
      <button onClick={handleSubmit} className="FacultyViewTopicsButton">
        View topics
      </button>

      <button onClick={handleSubmit} className="LogoutButton">
        Logout
      </button>
    </div>
  );
};

export default Faculty_Homepage;
