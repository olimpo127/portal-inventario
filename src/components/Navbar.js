import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";


function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem('jwtToken');
    // Redirect to the login page
    navigate('/login');
  };
  return (
    <div className="navbar">
      <Link to="/" className="navbar-home">
        Home
      </Link>
      <Link to="/tasks" className="navbar-home">
        Tasks
      </Link>
      <div className="bottomButtons">
        <Link to="/signup" className="navbar-button navbar-signup">
          Sign Up
        </Link>
        <Link to="/login" className="navbar-button navbar-login">
          Login
        </Link>
        <button onClick={handleLogout} className="logout">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
