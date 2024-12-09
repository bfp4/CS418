import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

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

  const reviews = [
    { id: 1, text: "This is a great topic!" },
    { id: 2, text: "I found this topic very informative." },
  ]


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
    const ratingValues = {
      user_id: localStorage.getItem('user_id'),
      topic_id: id,
      rating: newRating,
      review: newReview,
    }
    if(newReview != "" && newRating != ""){
      axios
      .post("http://localhost:5001/createRating", ratingValues) // Pass `id` as query parameter
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error posting rating:", error);
      });
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
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
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
            <label>Rating:</label><br />     
            <input
                type="number"
                value={newRating}
                onChange={(e) => setNewRating(e.target.value)}
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