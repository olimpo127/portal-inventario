import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
      <Link to='/' className='navbar-button navbar-home'>
        Home
      </Link>
      <Link to="/signup" className='navbar-button navbar-signup'>
        Sign Up
      </Link>
      <Link to="/login" className='navbar-button navbar-login'>
        Login
      </Link>
    </div>
  );
}

export default Navbar;
