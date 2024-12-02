import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Aboutus = () => {
  const navigate = useNavigate()
  const handleHome = () => {
    navigate("/home")
  };

  const handleGoBack = () => {
    navigate(-1)
  };
  return (
    <div className="Aboutus">
      <h2>About Us</h2>
      <div className="team-container">
        {/* Team Member 1 */}
        <div className="team-member">
          <img src="person1.jpg" alt="Person 1" className="team-member-image" />
          <h3>John Doe</h3>
          <p>Role: Developer</p>
          <p>
            Description: John is a passionate developer focused on building
            intuitive user interfaces.
          </p>
        </div>
        {/* Team Member 2 */}
        <div className="team-member">
          <img src="person2.jpg" alt="Person 2" className="team-member-image" />
          <h3>Jane Smith</h3>
          <p>Role: Designer</p>
          <p>
            Description: Jane is the creative mind behind the UI/UX designs and
            visual direction.
          </p>
        </div>
        {/* Team Member 3 */}
        <div className="team-member">
          <img src="person3.jpg" alt="Person 3" className="team-member-image" />
          <h3>Mike Johnson</h3>
          <p>Role: Product Manager</p>
          <p>
            Description: Mike ensures that the product aligns with business
            goals and user needs.
          </p>
        </div>
        {/* Team Member 4 */}
        <div className="team-member">
          <img src="person4.jpg" alt="Person 4" className="team-member-image" />
          <h3>Amy Lee</h3>
          <p>Role: Marketing Specialist</p>
          <p>
            Description: Amy is responsible for promoting the product and
            reaching out to customers.
          </p>
        </div>
        {/* Team Member 5 */}
        <div className="team-member">
          <img src="person5.jpg" alt="Person 5" className="team-member-image" />
          <h3>David Brown</h3>
          <p>Role: QA Engineer</p>
          <p>
            Description: David ensures the product is free from bugs and
            performs optimally.
          </p>
        </div>
      </div>
      <div className="button_container">
        <button className="HomeButton" onClick={handleHome}>Home</button>
        <button className="GobackButton" onClick={handleGoBack}>Go back</button>
      </div>
    </div>
  );
};

export default Aboutus;
