import React from 'react';
import "./Home.css";


function Home() {
  return (
    <div className='home'>
      <h1>Welcome to Our Service Exchange App</h1>
      <p>Find the services you need or offer your skills to others in just a few clicks.</p>
      <div className="purpose">
        <div className="find-service">
          <h2>Find a Service</h2>
          <p>Looking for someone to help you with a task or project? Search our listings to find the perfect service provider.</p>
        </div>
        <div className="offer-service">
          <h2>Offer a Service</h2>
          <p>Have a skill or service to offer? Create a listing and connect with people who need your expertise.</p>
        </div>
      </div>
      <p>Join our community and start exchanging services today!</p>
      <div className="cta-buttons">
        <button className="find-button">Find Services</button>
        <button className="offer-button">Offer Services</button>
      </div>

    </div>
  )
}

export default Home;
