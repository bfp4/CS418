import React, { useState } from "react";
import "./styles.css";

const Adminview = () => {
  const [topics, setTopics] = useState([
    "Example Topic",
    "Example Topic",
    "Example Topic",
    "Example Topic",
    "Example Topic",
  ]);

  //   needs implementation
  const handleAddTopic = () => {
    setTopics([...topics, "New Topic"]);
  };

  const handleGoBack = () => {
    console.log("Going back...");
  };

  return (
    <div className="Adminview">
      <h2>Topics</h2>
      <div className="topics-container">
        {topics.map((topic, index) => (
          <div key={index} className="topic">
            <h3>{topic}</h3>
          </div>
        ))}
      </div>
      <div className="button_container">
        <button className="addtopicButton" onClick={handleAddTopic}>
          Add Topic
        </button>
        <button className="reviewtopicsButton" onClick={handleAddTopic}>
          Review Topics
        </button>
        <button className="GobackButton" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Adminview;
