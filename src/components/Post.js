import React, { useState } from 'react';

function Post() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
  });
  const [posts, setPosts] = useState([]);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create a new post object
    const newPost = {
      name: formData.name,
      price: formData.price,
      location: formData.location,
    };
    
    // Update the list of posts
    setPosts([...posts, newPost]);

    // Reset the form and hide it
    setFormData({
      name: '',
      price: '',
      location: '',
    });
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Create Post</button>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Create</button>
        </form>
      )}
      
      <div>
        <h2>Posts:</h2>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <strong>Name:</strong> {post.name}<br />
              <strong>Price:</strong> {post.price}<br />
              <strong>Location:</strong> {post.location}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Post;
