import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const AddTopic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // To store the uploaded image

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setImage(file); // Update the image state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (image) {
      formData.append("image", image); // Add image to form data if available
    }

    try {
      // Make an API call to submit the form data
      const response = await axios.post("/your-api-endpoint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      // Navigate or show success message
    } catch (error) {
      console.error("Error uploading topic:", error);
    }
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
        <input
          type="text"
          className="CenteredInputField"
          placeholder="Category of establishment"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* Image Upload */}
        <input
          type="file"
          className="CenteredInputField"
          accept="image/*" // Restrict file type to images
          onChange={handleImageChange}
        />

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
