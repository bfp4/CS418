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

  const [topic, setTopic] = useState({});
  const [reviews, setReviews] = useState([]);

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
        setTopic(res.data); // Use the response data to set the topic
      })
      .catch((error) => {
        console.error("Error fetching topic:", error);
      });
    axios
      .get("http://localhost:5001/getRatings", { params: { id } }) // Pass `id` as query parameter
      .then((res) => {
        console.log(res);
        setReviews(res.data); // Use the response data to set the topic
      })
      .catch((error) => {
        console.error("Error fetching ratings:", error);
      });
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddReview = () => {
    const reviewValues = {
      user_id: localStorage.getItem("user_id"),
      topic_id: id,
      rating: newRating,
      review: newReview,
    };
    axios
      .post("http://localhost:5001/createRating", reviewValues) // Pass `id` as query parameter
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching ratings:", error);
      });
  };

  const handleDeleteReview = (reviewId) => {
    axios
      .delete(`http://localhost:5001/deleteRating/${reviewId}`) // Pass `id` as query parameter
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error delete ratings:", error);
      });
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
      <p>{topic.description || "Loading..."}</p>
      <div>
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>{review.review}</p>
                <RatingDisplay rating={review.rating || 0} />
                {role === "Admin" && (
                  <button
                    onClick={() => handleDeleteReview(review._id)}
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
            <label>Rating:</label>
            <br />
            <input
              type="number"
              value={newRating}
              onChange={(e) => {
                const value = Math.max(1, Math.min(5, Number(e.target.value))); // Clamps value between 1 and 5
                setNewRating(value);
              }}
              min="1"
              max="5"
            />
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
        <button className="GobackButton" onClick={handleGoBack}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default EachTopic;
