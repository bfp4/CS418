import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const ReviewTopics = () => {
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
    navigate("/AddTopic");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="adminreview">
      <h2>Topics</h2>
      <div className="topics-container">
        {topics.map((topic, index) => (
          <div key={index} className="topic">
            <h3>{topic}</h3>
            <div className="btn_container">
              <button className="reviewTopicButton" onClick={handleGoBack}>
                Approve
              </button>
              <button className="denyTopicButton" onClick={handleGoBack}>
                Deny
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="addtopicButton" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default ReviewTopics;
