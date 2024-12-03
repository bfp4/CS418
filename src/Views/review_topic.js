import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const ReviewTopics = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/getTopics')
    .then(function (response) {
      setTopics(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  const handleApproval = approval => {

  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="adminreview">
      <h2>Topics</h2>
      <div className="topics-container">
        {topics.map((topic, index) => (
          <div key={index} className="topic">
            <h3>{topic.title}</h3>
            <h5>{topic.category}</h5>
            <p>{topic.description}</p>
            <div className="btn_container">
              <button className="reviewTopicButton" onClick={() => handleApproval(true)}>
                Approve
              </button>
              <button className="denyTopicButton" onClick={() => handleApproval(false)}>
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
