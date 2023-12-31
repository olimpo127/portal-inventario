import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import config from "../utils/Config";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    secret: config.jwtSecret, 
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("jwtToken", data.token);
        navigate("/moviles");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
