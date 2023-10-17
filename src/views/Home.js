import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="welcome-message">
        <h1>Welcome to Our TaskBuddy App</h1>
        <p>
          Find the TaskBuddy you need or offer your skills to others in just a
          few clicks.
        </p>
      </div>
      <div className="purpose">
        <div className="find-service">
          <h2>Find a TaskBuddy</h2>
          <p>
            Looking for someone to help you with a task or project? Search our
            listings to find the perfect service provider.
          </p>
        </div>
        <div className="offer-service">
          <h2>Offer a Service</h2>
          <p>
            Have a skill or service to offer? Create a listing and connect with
            people who need your expertise.
          </p>
        </div>
      </div>
      <p>Join our community and start exchanging services today!</p>
      <div className="cta-buttons">
      <Link to="/tasks" className="become">
        Find or Become a TaskBuddy here
      </Link>
      </div>
    </div>
  );
}

export default Home;
