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
  const isLoggedIn = localStorage.getItem('loggedInUser')
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={isLoggedIn ? <Navigate to="/Home" /> : <Login />} />
          <Route path="/Signup" element={isLoggedIn ? <Navigate to="/Home" /> : <Signup />} />
          <Route path="/Home" element={isLoggedIn ? <Homepage /> : <Navigate to="/Login" />} />
          <Route path="/Aboutus" element={isLoggedIn ? <Aboutus /> : <Navigate to="/Login" />} />
          <Route path="/ViewTopics" element={isLoggedIn ? <ViewTopics /> : <Navigate to="/Login" />} />
          <Route path="/EachTopic" element={isLoggedIn ? <EachTopic /> : <Navigate to="/Login" />} />
          <Route path="/AddTopic" element={isLoggedIn ? <AddTopic /> : <Navigate to="/Login" />} />
          <Route path="/ReviewTopics" element={isLoggedIn ? <ReviewTopics /> : <Navigate to="/Login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
