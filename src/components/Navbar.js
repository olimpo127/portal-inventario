import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken"); // Check if a JWT token exists



  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Link to="/" className="hites">
        <img
          src="data:image/png;base64,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"
          alt="Hites Logo"
          style={{ height: "50px" }}
        />
      </Link>
      <div>
      <Link to="/moviles" className="navbar-home">
        Moviles
      </Link>
      <Link to="/notebooks" className="navbar-home">
        Notebooks
      </Link>
      </div>
      
      <div className="bottomButtons">
        {!jwtToken ? (
          <React.Fragment>
            {/* <Link to="/signup" className="navbar-button navbar-login">
              Sign Up
            </Link>  */}
            <Link to="/login" className="navbar-button navbar-login">
              Login
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button onClick={handleLogout} className="logout logout-button">
              Logout
            </button>
            <Link to="/management" className="navbar-profile">
              Manage Users
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Navbar;
