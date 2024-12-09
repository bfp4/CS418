import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AdminEachTopic = () => {
  const location = useLocation();
  const { id } = location.state || {}; // Extract the passed `id`
  const navigate = useNavigate();

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

  const [newReview, setNewReview] = useState("");
  const reviewsEndRef = useRef(null);

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
      const newReviewObj = { id: Date.now(), text: newReview };
      setTopic((prevTopic) => ({
        ...prevTopic,
        reviews: [...prevTopic.reviews, newReviewObj],
      }));
      setNewReview(""); // Clear the review input field
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
      <h2>{topic.title}</h2>
      <h4>{topic.category}</h4>

      <div>
        <h3>Reviews</h3>
        {topic.reviews.length > 0 ? (
          <ul>
            {topic.reviews.map((review) => (
              <li key={review.id}>
                <p>{review.text}</p>
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

        {/* Add a review */}
        {role === "Student" && (
          <>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Add your review here..."
            />
            <button onClick={handleAddReview} className="reviewButton">
              Add Review
            </button>
          </>
        )}

        {/* Scroll to the latest review */}
        <div ref={reviewsEndRef} />
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

export default AdminEachTopic;