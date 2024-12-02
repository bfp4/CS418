import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Admin_Homepage = () => {
  const navigate = useNavigate();

  const handleClick = link => {
    navigate(link);
  };

  const handleSubmit = async (e) => {};

  return (
    <div className="adminHome">
      <h2>Home</h2>
      <button onClick={() => handleClick("/Aboutus")} className="AboutButton">
        About us
      </button>
      <button onClick={handleSubmit} className="TopicsButton">
        View topics
      </button>
      <button onClick={() => handleClick("/login")} className="LogoutButton">
        Logout
      </button>
    </div>
  );
};

export default Admin_Homepage;
