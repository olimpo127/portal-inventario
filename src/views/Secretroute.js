import React, { useState, useEffect } from "react";
import "./Secretroute.css";

function Secretroute() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    });
    const [updateUser, setUpdateUser] = useState({
      id: "",
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
  
  
    const handleDelete = (id) => {
      fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.status === 204) {
            console.log('User deleted');
            getUsers();
          } else {
            console.error('Error deleting user');
          }
        })
        .catch(error => console.error('Error:', error));
    };
    
    const handleUpdateInputChange = (event) => {
      const { name, value } = event.target;
      setUpdateUser({ ...updateUser, [name]: value });
    };
    
    const handleUpdate = (event) => {
      event.preventDefault();
  
      fetch(`http://localhost:5000/users/${updateUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User updated:", data);
          setUpdateUser({
            id: "",
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
        <h1>Delete User</h1>
        <form className="signUpForm">
          <input
            type="text"
            name="id"
            value={newUser.id}
            onChange={handleInputChange}
            placeholder="Id"
            required
          />
          <button type="button" onClick={() => handleDelete(newUser.id)} className="createUserButton">
            Delete User
          </button>
        </form>
  
        <h1>Update User</h1>
        <form onSubmit={handleUpdate} className="signUpForm">
          <input
            type="text"
            name="id"
            value={updateUser.id}
            onChange={handleUpdateInputChange}
            placeholder="User ID"
            required
          />
          <input
            type="text"
            name="name"
            value={updateUser.name}
            onChange={handleUpdateInputChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="lastname"
            value={updateUser.lastname}
            onChange={handleUpdateInputChange}
            placeholder="Lastname"
          />
          <input
            type="text"
            name="username"
            value={updateUser.username}
            onChange={handleUpdateInputChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={updateUser.email}
            onChange={handleUpdateInputChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={updateUser.password}
            onChange={handleUpdateInputChange}
            placeholder="Password"
          />
          <button type="submit" className="createUserButton">Update User</button>
        </form>
      </div>
    );
}

export default Secretroute;
