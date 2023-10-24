import React, { useState, useEffect } from "react";
import "./Signup.css";

function Signup() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
      name: "",
      lastname: "",
      username: "",
      email: "",
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
            name: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
          });
          getUsers();
        })
        .catch((error) => console.error("Error:", error));
    };
    
    return (
      <div className="signUp">
        <h1>Create User</h1>
        <form className="signUpForm" onSubmit={handleSubmit}>
          <div>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="lastname"
            value={newUser.lastname}
            onChange={handleInputChange}
            placeholder="Lastname"
            required
          />
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
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          </div>
          <button type="submit" className="createUserButton">Create User</button>
        </form>
      </div>
    );
}

export default Signup;
