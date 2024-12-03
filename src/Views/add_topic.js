import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const AddTopic = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");


  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
  };

  const handleGoBack = () => {
<<<<<<< HEAD
    navigate("/ViewTopics")
  };
=======
    navigate(-1);
  };

>>>>>>> dc56f5e62cc70601ebfe6bf780657a125c411f27

  const handleSubmit = () => {
    
    const topicValues = {
      title: title,
      description: description,
      category: category,
      approved: false
    }

    axios.post("http://localhost:5001/addTopic", topicValues)
      .then((res) => {
        resetForm(); 
        navigate("/Home"); 
      })
      .catch((err) => alert("Error on adding."));
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
          required
        >
          <option value="" disabled>
            Choose Category
          </option>
          <option value="Food & Dining">Food & Dining</option>
          <option value="Professors">Professors</option>
          <option value="Courses">Courses</option>
          <option value="Departments">Departments</option>
          <option value="Housing & Dormitories">Housing & Dormitories</option>
          <option value="Libraries">Libraries</option>
          <option value="Gyms">Gyms</option>
          <option value="Career Services">Career Services</option>
          <option value="Health Services">Health Services</option>
          <option value="Campus Life">Campus Life</option>
          <option value="Transportation">Transportation</option>
          <option value="Computer Labs">Computer Labs</option>
          <option value="Safety & Security">Safety & Security</option>
          <option value="Social Spaces">Social Spaces</option>
        </select>

        <div className="button_container">
          <button type="submit" className="AddButton">
            Submit topic request
          </button>
<<<<<<< HEAD
          <button type="button" className="GobackButton" onClick={handleGoBack}>
            Go back
=======
          <button className="addtopicButton" onClick={handleGoBack}>
            Go Back
>>>>>>> dc56f5e62cc70601ebfe6bf780657a125c411f27
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTopic;
