import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import './Tasks.css';

const Tasks = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      navigate('/login');
    } else {
      // Verify the token on the server side
      fetch('http://localhost:5000/verify_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => {
          if (response.ok) {
            setLoading(false);
          } else {
            // Token is invalid, redirect to login
            navigate('/login');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          navigate('/login');
        });
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loading'>Loading...</div>
      </div>
    );
  }
  
  return (
    <div>
      <div>
        <Post />
      </div>
    </div>
  );
};

export default Tasks;
