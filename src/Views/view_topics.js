import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const ViewTopics = () => {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([
      "Example Topic",
      "Example Topic",
      "Example Topic",
      "Example Topic",
      "Example Topic",
    ]);
  
    //   needs implementation
    const handleAddTopic = () => {
      navigate("/Home")
    };
  
    const handleGoBack = () => {
      navigate(-1)
    };
  
    return (
      <div className="studentview">
        <h2>Topics</h2>
        <div className="topics-container">
          {topics.map((topic, index) => (
            <div key={index} className="topic">
              <h3>{topic}</h3>
            </div>
          ))}
        </div>
        <div className="button_container">
          <button className="addtopicButton">
              Review New Topics
          </button>
          <button className="addtopicButton" onClick={handleAddTopic}>
            Add Topic
          </button>
          <button className="addtopicButton" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    );
}

export default ViewTopics;

