import React, { useState, useEffect } from "react";
import "./Post.css";

function Post() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    seller: "",
    service: "",
    price: "",
    location: "",
    picture: "",
  });
  const [updatePost, setUpdatePost] = useState({
    id: "",
    seller: "",
    service: "",
    price: "",
    location: "",
    picture: "",
  });
  const [filterCriteria, setFilterCriteria] = useState({
    seller: "",
    service: "",
    price: "",
    location: "",
  });

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
          seller: "",
          service: "",
          price: "",
          location: "",
          picture: "",
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

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatePost({ ...updatePost, [name]: value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    fetch(`http://localhost:5000/posts/${updatePost.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post updated:", data);
        setUpdatePost({
          id: "",
          seller: "",
          service: "",
          price: "",
          location: "",
          picture: "",
        });
        getPosts();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const clearFilters = () => {
    setFilterCriteria({
      seller: "",
      service: "",
      price: "",
      location: "",
    });
  };

  const filteredPosts = posts.filter((post) => {
    const { seller, service, price, location } = filterCriteria;

    return (
      (!seller || post.seller.toLowerCase().includes(seller.toLowerCase())) &&
      (!service || post.service.toLowerCase().includes(service.toLowerCase())) &&
      (!price || parseFloat(post.price) >= parseFloat(price)) &&
      (!location || post.location.toLowerCase().includes(location.toLowerCase()))
    );
  });

  return (
    <div className="post">
      <form className="createNewPost" onSubmit={handleFormSubmit}>
      <h2>Crea tu Post</h2>
      <label>
          Seller:
          <input
            type="text"
            name="seller"
            value={newPost.seller}
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
        <label>
          Picture:
          <input
            type="text"
            name="picture"
            value={newPost.picture}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="createButton">Create Post</button>
      </form>

      <div className="filters">
        <h2>Búsqueda por filtros</h2>
        <label>
          Filter by Seller:
          <input
            type="text"
            name="seller"
            value={filterCriteria.seller}
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
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <h2>Posts:</h2>
      <ul>
        {filteredPosts.map((post, index) => (
          <li key={index} className="singlePost">
             <strong>Seller:</strong> {post.seller}
              <br />
              <strong>Service:</strong> {post.service}
              <br />
              <strong>Price:</strong> {post.price}
              <br />
              <strong>Location:</strong> {post.location}
              <br />
              <strong>Picture:</strong> {post.picture}
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
