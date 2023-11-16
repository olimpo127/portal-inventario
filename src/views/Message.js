import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Message = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // Fetch users
      fetch('http://localhost:5000/users/list', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch users');
          }
        })
        .then(data => {
          setUsers(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  }, [navigate]);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);

    const token = localStorage.getItem('jwtToken');
    // Fetch messages for the selected user
    fetch(`http://localhost:5000/messages/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch messages');
        }
      })
      .then(data => setMessages(data.messages))
      .catch(error => console.error(`Error fetching messages for user ${userId}:`, error));
  };

  const handleSendMessage = () => {
    const token = localStorage.getItem('jwtToken');
    // Send a new message
    fetch('http://localhost:5000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
        recipient_id: selectedUser,
        content: newMessage,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to send message');
        }
      })
      .then(data => {
        setMessages([...messages, data.message]);
        setNewMessage('');
      })
      .catch(error => console.error('Error sending message:', error));
  };

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loading'>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => handleUserClick(user.id)}>
            {user.username}
          </li>
        ))}
      </ul>

      <h2>Messages</h2>
      <div>
        {selectedUser && (
          <>
            <ul>
              {messages.map(message => (
                <li key={message.id}>
                  {message.content}
                </li>
              ))}
            </ul>

            <div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
