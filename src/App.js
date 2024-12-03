import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Views/login.js";
import Signup from "./Views/signup.js";
import Homepage from "./Views/homepage.js";
import Aboutus from "./Views/about_us.js";
import ViewTopics from "./Views/view_topics.js";
import AddTopic from "./Views/add_topic.js";
import EachTopic from "./Views/each_topic.js"; // Updated the name to PascalCase
import ReviewTopics from "./Views/review_topic.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Homepage />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/ViewTopics" element={<ViewTopics />} />
          <Route path="/EachTopic" element={<EachTopic />} />
          <Route path="/AddTopic" element={<AddTopic />} />
          <Route path="/ReviewTopics" element={<ReviewTopics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
