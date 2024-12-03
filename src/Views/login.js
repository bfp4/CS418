import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    navigate("/signup");
  };

  const handleSubmit = (event) => {
    event.preventDefault()
        axios.get('http://localhost:5001/login', { params: { username, password}})
            .then((res) => {
                if (res.data) {
                    alert('Login Successful')
                    localStorage.clear()
                    localStorage.setItem('loggedInUser', res.data._id)
    	            navigate("/Home");
                }
                else {
                    alert('Wrong Credentials')
                }
            })
            .catch((err) => alert('Error in Login'))
  };

  return (
    <div className="LoginTab">
      <h2>Welcome, Login</h2>
      <input
        type="text"
        className="CenteredInputField"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Email or Username"
      />
      <input
        type="password"
        className="CenteredInputField"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSubmit} className="LoginButton">
        Login
      </button>

      <p onClick={handleClick} className="signup-text">
        Don't have an account? Click here
      </p>
    </div>
  );
};

export default Login;
