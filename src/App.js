import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Views/login.js";
import Signup from "./Views/signup.js";
import Homepage from "./Views/homepage.js";
import Aboutus from "./Views/about_us.js";
import ViewTopics from "./Views/view_topics.js";
import AddTopic from "./Views/add_topic.js";
import AdminEachTopic from "./Views/admin_each_topic.js"; // Updated the name to PascalCase
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Homepage />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/ViewTopics" element={<ViewTopics />} />
          <Route path="/AdminEachTopic" element={<AdminEachTopic />} />
          <Route path="/AddTopic" element={<AddTopic />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
