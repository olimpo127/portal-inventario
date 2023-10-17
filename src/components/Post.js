import React, { useState, useEffect } from "react";
import "./Post.css";

function Post() {
  const [posts, setPosts] = useState([]);

  const [newPost, setNewPost] = useState({
    name: "",
    service: "",
    price: "",
    location: "",
    user_id: "",
  });

  const [updatePost, setUpdatePost] = useState({
    id: "",
    name: "",
    service: "",
    price: "",
    location: "",
    user_id: "",
  });

  const [filterCriteria, setFilterCriteria] = useState({
    name: "",
    service: "",
    price: "",
    location: "",
    option: "",
  });

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const getPosts = () => {
    fetch("http://localhost:5000/posts/list")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post created:", data);
        setNewPost({
          name: "",
          service: "",
          price: "",
          location: "",
          user_id: "",
        });
        getPosts();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id) => {
    console.log('Delete button clicked with id:', id);
    fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE",
    })
      .then(response => {
        if (response.status === 204) {
          console.log('Post deleted');
          getPosts();
        } else {
          console.error('Error deleting post');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const clearFilters = () => {
    setFilterCriteria({
      name: "",
      service: "",
      price: "",
      location: "",
      option: "",
    });
  };

  const filteredPosts = posts.filter((post) => {
    const { name, price, location, option } = filterCriteria;
    const optionFilter = option === '' || post.service === option;
  
    return (
      optionFilter &&
      (!name || post.name.toLowerCase().includes(name.toLowerCase())) &&
      (!price || parseFloat(post.price) >= parseFloat(price)) &&
      (!location || post.location.toLowerCase().includes(location.toLowerCase()))
    );
  });

  return (
    <div className="post">
      <form className="createNewPost" onSubmit={handleFormSubmit}>
        <h2>Crea tu Post</h2>
        <label>Tipo de Post:</label>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="Option1">Ofrezco</option>
          <option value="Option2">Busco</option>
        </select>
        <label>
          name:
          <input
            type="text"
            name="name"
            value={newPost.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Service:
          <input
            type="text"
            name="service"
            value={newPost.service}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newPost.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={newPost.location}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" className="createButton">Create Post</button>
      </form>

      <div className="filters">
        <h2>Búsqueda por filtros</h2>
        <label>
          Filter by name:
          <input
            type="text"
            name="name"
            value={filterCriteria.name}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Filter by Service:
          <input
            type="text"
            name="service"
            value={filterCriteria.service}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Filter by Price:
          <input
            type="number"
            name="price"
            value={filterCriteria.price}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Filter by Location:
          <input
            type="text"
            name="location"
            value={filterCriteria.location}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Filter by Option:
          <select
            name="option"
            value={filterCriteria.option}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Option1">Ofrezco</option>
            <option value="Option2">Busco</option>
          </select>
        </label> 
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <h2>Posts:</h2>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id} className="singlePost">
            <strong>name:</strong> {post.name}
            <br />
            <strong>Service:</strong> {post.service}
            <br />
            <strong>Price:</strong> {post.price}
            <br />
            <strong>Location:</strong> {post.location}
            <br />
            <strong>User ID:</strong> {post.user_id}
            <br />
            <button className="interestedButton">I am interested</button>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete Post</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
