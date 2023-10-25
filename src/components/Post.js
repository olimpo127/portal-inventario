import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Post.css";

function Post() {
  const [posts, setPosts] = useState([]);

  const [newPost, setNewPost] = useState({
    service: "",
    price: "",
    location: "",
    option: "",
    user_id: "",
  });

  const [updatePost, setUpdatePost] = useState({
    id: "",
    service: "",
    price: "",
    location: "",
    user_id: "",
  });

  const [filterCriteria, setFilterCriteria] = useState({
    service: "",
    price: "",
    location: "",
    option: "",
    user_id: "",
  });

  const [selectedOption, setSelectedOption] = useState("");

  const token = localStorage.getItem("jwtToken");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setNewPost({ ...newPost, option: e.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "option") {
      setSelectedOption(value);
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
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
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post created:", data);
        setNewPost({
          service: "",
          price: "",
          location: "",
          option: "",
          user_id: "",
        });
        getPosts();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id) => {
    console.log("Delete button clicked with id:", id);
    fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Post deleted");
          getPosts();
        } else {
          console.error("Error deleting post");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const clearFilters = () => {
    setFilterCriteria({
      service: "",
      price: "",
      location: "",
      option: "",
      user_id: "",
    });
  };

  const filteredPosts = posts.filter((post) => {
    const { service, price, location, option, user_id } = filterCriteria;

    return (
      (!service ||
        post.service.toLowerCase().includes(service.toLowerCase())) &&
      (!price || parseFloat(post.price) >= parseFloat(price)) &&
      (!location ||
        post.location.toLowerCase().includes(location.toLowerCase())) &&
      (!option || post.option.includes(option)) &&
      (!user_id || post.user_id.toLowerCase().includes(user_id))
    );
  });

  return (
    <div className="post">
      {/* ---------------------------------creacion post--------------------------------------- */}
      <div className="postContainer">
        <form className="createNewPost" onSubmit={handleFormSubmit}>
          <h2>Crea tu Post</h2>
          <div className="form-group">
            <label htmlFor="service">Service:</label>
            <input
              type="text"
              id="service"
              name="service"
              placeholder="Publica el servicio que ofreces o buscas"
              value={newPost.service}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newPost.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newPost.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="option">Tipo de Post:</label>
            <select
              id="option"
              name="option"
              onChange={handleOptionChange}
              value={selectedOption}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Ofrezco">Ofrezco</option>
              <option value="Busco">Busco</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="createButton">
              Create Post
            </button>
          </div>
        </form>
        {/* --------------------------------Filtros post-------------------------------------------------- */}
        <div className="filters">
          <h2>Búsqueda por filtros</h2>
          <div className="form-group">
            <label>Filter by Service:</label>
            <input
              type="text"
              name="service"
              placeholder="Servicio que ofreces o buscas"
              value={filterCriteria.service}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <label>Filter by Price:</label>
            <input
              type="number"
              name="price"
              value={filterCriteria.price}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <label>Filter by Location:</label>
            <input
              type="text"
              name="location"
              value={filterCriteria.location}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <label>Filter by Option:</label>
            <select
              name="option"
              value={filterCriteria.option}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Ofrezco">Ofrezco</option>
              <option value="Busco">Busco</option>
            </select>
          </div>
          <div className="form-group">
            <label>Filter by User:</label>
            <input
              type="text"
              name="user_id"
              value={filterCriteria.user_id}
              onChange={handleFilterChange}
            />
          </div>

          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>

      {/* --------------------------------POSTS-------------------------------------------------- */}
      <h2>Posts:</h2>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id} className="singlePost">
            <strong>Service:</strong> {post.service}
            <br />
            <strong>Price:</strong> {post.price}
            <br />
            <strong>Location:</strong> {post.location}
            <br />
            <strong>Option:</strong> {post.option}
            <br />
            <Link to={`/profile/${post.user_id}`}>
              <strong>User ID:</strong> {post.user_id}
            </Link>
            <br />
            <button className="interestedButton">I am interested</button>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
