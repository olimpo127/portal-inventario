import React from 'react';
import "./Navbar.css";


function Navbar() {
  return (
    <div className='navbar'>
      <button className='navbar-home'>HOME</button>
      <button className='navbar-signup'>Sign Up</button>
      <button className='navbar-login'>Login</button>
    </div>
  )
}

export default Navbar;
