import React, { useState, useEffect } from "react";
import "./Login.css";

function Login() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
      username: "",
      password: "",
    });

  
    useEffect(() => {
      getUsers();
    }, []);
  
    const getUsers = () => {
      fetch("http://localhost:5000/users/list")
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error("Error:", error));
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewUser({ ...newUser, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User created:", data);
          setNewUser({
            username: "",
            password: "",
          });
          getUsers();
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
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
          </div>
          <div>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          </div>
          <button type="submit" className="loginButton">Login</button>
        </form>
      </div>
    );
}

export default Login;