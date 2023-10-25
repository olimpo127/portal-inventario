import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
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
  }, []);

  return (
    <div className="profile">
      <h1>My Profile</h1>
      {loading ? (
        <p className="loading">Loading...</p> 
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Lastname: {user.lastname}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;