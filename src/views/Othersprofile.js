import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Othersprofile.css";

function Othersprofile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { email } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/profile/${email}`, { 
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        if (response.status === 200) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user profile.");
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [email]);

  return (
    <div className="other-users-profile">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <h1>{user.name}'s Profile</h1>
          <p>Name: {user.name}</p>
          <p>Lastname: {user.lastname}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Othersprofile;