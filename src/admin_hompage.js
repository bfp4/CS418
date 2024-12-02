import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Admin_Homepage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {};

  return (
    <div className="adminHome">
      <h2>Home Admin</h2>
      <button onClick={handleSubmit} className="AboutButton">
        About us
      </button>
      <button onClick={handleSubmit} className="TopicsButton">
        View topics
      </button>

      <button onClick={handleSubmit} className="LogoutButton">
        Logout
      </button>
    </div>
  );
};

export default Admin_Homepage;
