import React, { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login.js";
import Signup from "./signup.js";
import Admin_Homepage from "./admin_hompage.js";
import Faculty_Homepage from "./faculty_homepage.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Admin_Homepage" element={<Admin_Homepage />} />
          <Route path="/Faculty_Homepage" element={<Faculty_Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
