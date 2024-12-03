import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import axios from "axios"

const AdminEachTopic = () => {
  const location = useLocation();
  const { id } = location.state || {}; // Extract the passed `id`
  // Sample data for the topic
  const [topic, setTopic] = useState({
    title: "Sample Topic Title",
    category: "Sample Category",
    reviews: [
      { id: 1, text: "This is a great topic!" },
      { id: 2, text: "I found this topic very informative." },
    ],
  });

  useEffect(() => {
    axios
        .get('http://localhost:5001/getTopic', { params: { id } }) // Pass `id` as query parameter
        .then(res => {
            console.log(res);
            setTopic(res.data); // Use the response data to set the topic
        })
        .catch(error => {
            console.error('Error fetching topic:', error);
        });
}, [id]);


  const [newReview, setNewReview] = useState("");
  const reviewsEndRef = useRef(null); // Reference to scroll to the end of the reviews

  const handleAddReview = () => {
    if (newReview.trim()) {
      const newReviewObj = { id: Date.now(), text: newReview };
      setTopic((prevTopic) => ({
        ...prevTopic,
        reviews: [...prevTopic.reviews, newReviewObj],
      }));
      setNewReview(""); // Clear the review input field
    }
  };

  const handleDeleteTopic = () => {
    setTopic({
      title: "",
      category: "",
      reviews: [],
    });
  };

  const handleDeleteReview = (reviewId) => {
    setTopic((prevTopic) => ({
      ...prevTopic,
      reviews: prevTopic.reviews.filter((review) => review.id !== reviewId),
    }));
  };

  // Auto-scroll to the latest review when a new review is added
  useEffect(() => {
    if (reviewsEndRef.current) {
      reviewsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [topic.reviews]); // Runs every time the reviews change

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
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="DeleteButton"
                >
                  Delete Review
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}

        {/* Add a review */}
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Add your review here..."
        />
        <button onClick={handleAddReview} className="reviewButton">
          Add Review
        </button>

        {/* Scroll to the latest review */}
        <div ref={reviewsEndRef} />
      </div>

      {/* Delete Topic */}
      <div>
        <button onClick={handleDeleteTopic} className="DeleteButton">
          Delete Topic
        </button>
        <button className="GobackButton">Go back</button>
      </div>
    </div>
  );
};

export default AdminEachTopic;
