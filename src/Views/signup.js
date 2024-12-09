import "./styles.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Separate email state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Student"); // New state for role selection

  const handleClick = () => {
    const signupValues = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
      role: role
    }
    axios.post("http://localhost:5001/signup", signupValues)
      .then(res => {
        console.log(res)
          localStorage.clear()
          localStorage.setItem('loggedInUser', true)
          localStorage.setItem('role', role)
          localStorage.setItem('user_id', res.data._id)
          window.location.reload()   
      })
      .catch(err => alert("Error on Sign up."))
  };

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <div className="LoginTab">
      <h2>Sign Up</h2>
      <input
        type="text"
        className="CenteredInputField"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        className="CenteredInputField"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        type="text"
        className="CenteredInputField"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        className="CenteredInputField"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        className="CenteredInputField"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        className="CenteredInputField"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />

      <select
        className="CenteredInputField"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Student">Student</option>
        <option value="Faculty">Faculty</option>
      </select>

      <button onClick={handleClick} className="SignUpButton">
        Sign up
      </button>
      <p onClick={handleLogin} className="signup-text">
        Have an account? Click here
      </p>
    </div>
  );
};

export default Signup;
