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

    // Fetch user information from the API
    const fetchUserInitials = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Add the JWT token to the headers
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Handle error response
          console.error("Error fetching user data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the fetch function
    fetchUserInitials();
  }, [jwtToken]); // Trigger the effect when the jwtToken changes

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
            {/* Render the user's name in place of "Profile" */}
            <Link to="/profile" className="navbar-profile">
              {user ? `${user.name[0]} . ${user.lastname[0]}` : 'Profile'}
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Navbar;