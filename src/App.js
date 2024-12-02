import React, { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login.js";
import Signup from "./signup.js";
import Admin_Homepage from "./admin_hompage.js";
import Faculty_Homepage from "./faculty_homepage.js";
import Student_Homepage from "./student_homepage.js";
import Aboutus from "./about_us.js";
import Adminview from "./admin_view.js";
import Studentview from "./student_view.js";
import Facultyview from "./faculty_view.js";
import AddTopic from "./add_topic.js";
import AdminEachTopic from "./admin_each_topic.js"; // Updated the name to PascalCase
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Admin_Homepage" element={<Admin_Homepage />} />
          <Route path="/Faculty_Homepage" element={<Faculty_Homepage />} />
          <Route path="/Student_Homepage" element={<Student_Homepage />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Adminview" element={<Adminview />} />
          <Route path="/Studentview" element={<Studentview />} />
          <Route path="/Facultyview" element={<Facultyview />} />
          <Route path="/AdminEachTopic" element={<AdminEachTopic />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
