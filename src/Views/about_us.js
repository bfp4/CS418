import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Aboutus = () => {
  const navigate = useNavigate()
  const handleHome = () => {
    navigate("/home")
  };

  const handleGoBack = () => {
    navigate("/Home")
  };
  
  return (
    <div className="Aboutus">
      <h2>About Us</h2>
      <div className="team-container">
        {/* Team Member 1 */}
        <div className="team-member">
          {/* <img src="person1.jpg" alt="Person 1" className="team-member-image" />  */}
          <h3>Michael Levitskiy</h3>
          <p>Role: Backend Developer</p>
          <p>
            Description: Michael Levitskiy, a senior Computer Science student at UAlbany, discovered his passion for programming during his high school years when he stumbled upon a broken old computer in his family’s garage. Determined to fix it, Michael dove into online forums, tutorials, and open-source projects, eventually breathing life back into the machine. This experience sparked a fascination with how technology worked under the hood, leading him to teach himself basic coding in Python and JavaScript.
            During his freshman year at UAlbany, Michael created a JavaScript demo to showcase the flexibility of schema-driven applications. He designed it as a lightweight tool to dynamically generate forms based on JSON schema inputs, which caught the attention of his peers and professors alike. This demo not only demonstrated his coding skills but also exemplified his knack for solving practical problems efficiently.
            Over the years, Michael honed his skills further through internships and collaborative projects, emerging as a versatile developer with a passion for full-stack development and scalable systems. His early curiosity, combined with his dedication to learning, continues to shape his path as he prepares to step into the tech industry. .
          </p>
        </div>
        {/* Team Member 2 */}
        <div className="team-member">
          {/* <img src="person2.jpg" alt="Person 2" className="team-member-image" /> */}
          <h3>Ari Leverton</h3>
          <p>Role: Front End Developer</p>
          <p>
            Description: Ari Leverton, a senior Computer Science student at UAlbany, discovered his talent for front-end perfection during his middle school years when he decided to revamp his family's outdated bakery website. What started as a simple weekend project turned into an obsession with pixel-perfect designs and smooth, intuitive user experiences. Ari spent countless hours studying CSS animations, JavaScript frameworks, and responsive layouts, striving to create websites that not only looked stunning but performed flawlessly on any device.
            At UAlbany, Ari earned a reputation as the go-to developer for untangling even the most complex and inefficient front-end codebases. Whether it was optimizing loading times for massive web apps or reworking clunky designs into sleek, modern interfaces, Ari approached every challenge with a meticulous eye and creative solutions. His dedication to clean, maintainable code and his pursuit of front-end perfection make him a standout talent in the world of web development.
          </p>
        </div>
        {/* Team Member 3 */}
        <div className="team-member">
          {/* <img src="person3.jpg" alt="Person 3" className="team-member-image" /> */}
          <h3>Collin Gebauer</h3>
          <p>Role: Backend Developer</p>
          <p>
            Description: Collin Gebauer, a senior Computer Science student at UAlbany, discovered his knack for databases during a high school project where he attempted to build a gaming leaderboard for his friends. Initially, his solution was a chaotic mix of text files and makeshift code, but as the group’s competitive spirit grew, so did the demand for accurate, real-time stats. Determined to improve, Collin dove into database design, learning SQL and data normalization to create a robust system that could handle complex queries and deliver instant updates.
            That experience ignited a passion for managing and structuring data efficiently. At UAlbany, Collin took his skills to the next level, mastering everything from relational models to distributed databases. His ability to design elegant schemas, optimize queries, and solve intricate data challenges earned him the title of “database guru” among his peers. Whether it’s analyzing patterns or building scalable systems, Collin thrives on turning raw data into powerful, organized assets.
          </p>
        </div>
        {/* Team Member 4 */}
        <div className="team-member">
          {/* <img src="person4.jpg" alt="Person 4" className="team-member-image" /> */}
          <h3>Josh Abreu</h3>
          <p>Role: Front End Developer</p>
          <p>
            Description: Josh Abreu’s journey into the world of computer science began long before he enrolled at UAlbany. As a child, he was captivated by the way websites and apps seemed to bring ideas to life. He taught himself HTML and CSS at 13, spending hours redesigning his favorite websites and experimenting with creative interfaces. This passion carried into high school, where Josh began freelancing, quickly earning a reputation for his eye-catching, user-focused designs.
            At UAlbany, Josh built on this foundation, excelling in his coursework while honing his front-end development skills through hands-on projects. His dedication caught the attention of top-tier companies, leading to multiple internships where he contributed to cutting-edge applications and refined his expertise in design systems. With a natural flair for innovation and years of experience under his belt, Josh has become a leader in his field, blending artistry and technology to create masterful user experiences..
          </p>
        </div>
        {/* Team Member 5 */}
        <div className="team-member">
          {/* <img src="person5.jpg" alt="Person 5" className="team-member-image" /> */}
          <h3>Jake Burleski</h3>
          <p>Role: Backend Developer</p>
          <p>
            Description: Jake Burleski’s journey into backend development began in his sophomore year of high school when he volunteered to help digitize his local library's outdated catalog system. Armed with a curiosity for how systems worked behind the scenes, he taught himself basic coding and database management through YouTube tutorials and late-night tinkering.
            By the time he arrived at UAlbany, Jake had already built a portfolio of small projects, including a community scheduling app and a gaming leaderboard system. His natural affinity for backend logic and his ability to optimize databases earned him internships with local tech startups, where he honed his skills in scalability and system architecture.
            Now, as a senior at UAlbany, Jake is celebrated among peers and professors for his ability to design robust backend systems that not only solve complex problems but do so with elegance and efficiency. From hackathons to class projects, Jake has cemented his reputation as "The Architect of Backend Development," inspiring others to push boundaries in their own coding pursuits.
          </p>
        </div>
      </div>
      <div className="button_container">
        <button className="GobackButton" onClick={handleGoBack}>Go back</button>
      </div>
    </div>
  );
};

export default Aboutus;
