import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-home">
        Home
      </Link>
      <div className="bottomButtons">
        <Link to="/signup" className="navbar-button navbar-signup">
          Sign Up
        </Link>
        <Link to="/login" className="navbar-button navbar-login">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
