import React, { useState, useEffect } from "react";
import axios from "axios"
import "./styles.css";
import { useNavigate } from "react-router-dom";

const ViewTopics = () => {
    const role = localStorage.getItem('role')
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5001/getApprovedTopics')
      .then(function (response) {
        setTopics(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }, []);
  

    const handleAddTopic = () => {
      navigate("/AddTopic")
    };
  
    const handleGoBack = () => {
      navigate("/Home")
    };

    const handleReview = () => {
      navigate("/reviewTopics")
    }

    const handleClick = id => {
      navigate("/eachtopic", { state: { id } });
    };
  
    return (
      <div className="studentview">
        <h2>Topics</h2>
        <div className="topics-container">
          {topics.map((topic, index) => (
            <div key={index} className="topic" onClick={() => handleClick(topic._id)}>
              <h3>{topic.title}</h3>
            </div>
          ))}
        </div>
        <div className="button_container">
          {role == "Admin" ? <button className="addtopicButton" onClick={handleReview}>
              Review New Topics
          </button>: null}
          {role == "Faculty" ? null : <button className="addtopicButton" onClick={handleAddTopic}>
            Add Topic
          </button>}
          <button className="addtopicButton" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    );
}

export default ViewTopics;