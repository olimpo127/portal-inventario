import React, { useState, useEffect } from "react";
import "./Signup.css";

function Signup() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    is_admin: false, // Default to false for a regular user
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
    const { name, value, type, checked } = event.target;

    // Handle checkbox separately
    if (type === "checkbox") {
      setNewUser({ ...newUser, [name]: checked });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
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
          email: "",
          password: "",
          is_admin: false,
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
          <label>
            Admin:
            <input
              type="checkbox"
              name="is_admin"
              checked={newUser.is_admin}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit" className="createUserButton">
          Create User
        </button>
      </form>
    </div>
  );
}

export default Signup;
