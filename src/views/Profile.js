import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API request to fetch the user's profile data from the backend
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
          // Handle error, e.g., user is not authenticated
          console.error("Failed to fetch user profile.");
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="profile">
      <h1>Profile</h1>
      {loading ? (
        <p className="loading">Loading...</p> // Display a loading message while loading is true
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Lastname: {user.lastname}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
}

export default Profile;