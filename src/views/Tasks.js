import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import "./Tasks.css";

const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has a valid JWT token
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      // If the user doesn't have a valid token, navigate to the login page
      navigate('/login');
    } else {
      // You can add additional logic to verify the token's validity on the server
      // or decode the token to get user information, if needed.

      // Set loading to false to render the content
      setLoading(false);
    }
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Your tasks content here */}
          <Post />
        </div>
      )}
    </div>
  );
};

export default Tasks;
