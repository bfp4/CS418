import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const AddTopic = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    const topicValues = {
      title: title,
      description: description,
      category: category,
      approved: false
    }

    axios.post("http://localhost:5001/addTopic", topicValues)
      .then(res => navigate("/home"))
      .catch(err => alert("Error on adding."))
  };

  return (
    <div className="LoginTab">
      <h2>Add Topic</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          className="CenteredInputField"
          placeholder="Title of establishment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="CenteredInputField"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="CenteredInputField"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Example1">Example1</option>
          <option value="Example2">Example2</option>
        </select>

        <div className="button_container">
          <button type="submit" className="AddButton">
            Submit topic request
          </button>
          <button type="button" className="GobackButton">
            Go back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTopic;
