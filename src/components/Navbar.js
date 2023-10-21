import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const jwtToken = localStorage.getItem('jwtToken'); // Check if a JWT token exists

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
        {/* Conditional rendering of buttons */}
        {!jwtToken ? (
          <React.Fragment>
            <Link to="/signup" className="navbar-button navbar-signup">
              Sign Up
            </Link>
            <Link to="/login" className="navbar-button navbar-login">
              Login
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button onClick={handleLogout} className="logout logout-button">
              Logout
            </button>
            <Link to="/profile" className="navbar-profile">
              Profile
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Navbar;
