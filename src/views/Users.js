import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../components/User';
import './Users.css';

const Users = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      navigate('/login');
    } else {
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
        <User />
      </div>
    </div>
  );
};

export default Users;
