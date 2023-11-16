import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem('jwtToken'); // Check if a JWT token exists

  // State to hold user information
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = "http://localhost:5000/initials/";

    const fetchUserInitials = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`, 
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {

          console.error("Error fetching user data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserInitials();
  }, [jwtToken]); 

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
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
              {user ? `${user.name}´s profile` : 'Profile'}
            </Link>
            <Link to="/message" className="navbar-button navbar-login">
              Inbox
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Navbar;