import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Student_Homepage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {};

  return (
    <div className="studentHome">
      <h2>Home Students</h2>
      <button onClick={handleSubmit} className="AboutButton">
        About us
      </button>
      <button onClick={handleSubmit} className="StudentViewTopicsButton">
        View topics
      </button>

      <button onClick={handleSubmit} className="LogoutButton">
        Logout
      </button>
    </div>
  );
};

export default Student_Homepage;
