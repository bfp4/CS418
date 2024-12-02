import React, { useState } from "react";
import "./styles.css";

const Facultyview = () => {
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
    <div className="Facultyview">
      <h2>Topics</h2>
      <div className="topics-container">
        {topics.map((topic, index) => (
          <div key={index} className="topic">
            <h3>{topic}</h3>
          </div>
        ))}
      </div>
      <div className="button_container">
        <button className="GobackButton" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Facultyview;
