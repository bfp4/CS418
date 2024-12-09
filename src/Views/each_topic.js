import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons"; // Example icon

const EachTopic = () => {
  const location = useLocation();
  const { id } = location.state || {}; // Extract the passed `id`
  const navigate = useNavigate();

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState("");
  const reviewsEndRef = useRef(null);

  // Determine the role of the user
  const role = localStorage.getItem("role");

  const [topic, setTopic] = useState({
    title: "Sample Topic Title",
    category: "Sample Category",
    reviews: [
      { id: 1, text: "This is a great topic!" },
      { id: 2, text: "I found this topic very informative." },
    ],
  });

  const RatingDisplay = ({ rating }) => {
    const maxRating = 5; // Maximum number of Great Danes
    return (
      <div className="rating-display">
        {[...Array(maxRating)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faDog}
            style={{
              color: index < rating ? "#FFD700" : "#D3D3D3", // Gold for filled, gray for empty
            }}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/getTopic", { params: { id } }) // Pass `id` as query parameter
      .then((res) => {
        console.log(res);
        setTopic(res.data); // Use the response data to set the topic
      })
      .catch((error) => {
        console.error("Error fetching topic:", error);
      });
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddReview = () => {
    if (role === "Student" && newReview.trim()) {
      const newReviewObj = {
        id: Date.now(),
        text: newReview,
        rating: parseInt(newRating, 10) || 0, // Ensure the rating is a number
      };
      setTopic((prevTopic) => ({
        ...prevTopic,
        reviews: [...prevTopic.reviews, newReviewObj],
      }));
      setNewReview(""); // Clear the review input field
      setNewRating(""); // Clear the rating input field
    }
  };

  const handleDeleteTopic = () => {
    if (role === "Admin") {
      setTopic({
        title: "",
        category: "",
        reviews: [],
      });
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (role === "Admin") {
      setTopic((prevTopic) => ({
        ...prevTopic,
        reviews: prevTopic.reviews.filter((review) => review.id !== reviewId),
      }));
    }
  };

  // Auto-scroll to the latest review when a new review is added
  useEffect(() => {
    if (reviewsEndRef.current) {
      reviewsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [topic.reviews]);

  return (
    <div className="adminEachTopic">
      <h2>{topic.title || "Loading..."}</h2>
      <h4>{topic.category || "Loading..."}</h4>

      <div>
        <h3>Reviews</h3>
        {/* Ensure topic.reviews is defined before rendering */}
        {Array.isArray(topic.reviews) && topic.reviews.length > 0 ? (
          <ul>
            {topic.reviews.map((review) => (
              <li key={review.id}>
                <p>{review.text}</p>
                <RatingDisplay rating={review.rating || 0} />
                {role === "Admin" && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="DeleteButton"
                  >
                    Delete Review
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Delete Topic */}
      <div>
        {role === "Admin" && (
          <button onClick={handleDeleteTopic} className="DeleteButton">
            Delete Topic
          </button>
        )}
        <button className="GobackButton" onClick={handleGoBack}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default EachTopic;
