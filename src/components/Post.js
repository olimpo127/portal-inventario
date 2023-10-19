import React, { useState, useEffect } from "react";
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
    });
  };

  const filteredPosts = posts.filter((post) => {
    const { service, price, location, option } = filterCriteria;

    return (
      (!service || post.service.toLowerCase().includes(service.toLowerCase())) &&
      (!price || parseFloat(post.price) >= parseFloat(price)) &&
      (!location || post.location.toLowerCase().includes(location.toLowerCase())) &&
      (!option || post.option.includes(option))
    );
  });

  return (
    <div className="post">
      {/* ---------------------------------creacion post--------------------------------------- */}
      <form className="createNewPost" onSubmit={handleFormSubmit}>
        <h2>Crea tu Post</h2>
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
        <label>Tipo de Post:</label>
        <select
          name="option"
          onChange={handleOptionChange}
          value={selectedOption}
        >
          <option value="">Option</option>
          <option value="Ofrezco">Ofrezco</option>
          <option value="Busco">Busco</option>
        </select>

        <button type="submit" className="createButton">
          Create Post
        </button>
      </form>
      {/* --------------------------------Filtros post-------------------------------------------------- */}
      <div className="filters">
        <h2>Búsqueda por filtros</h2>
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
    <option value="Ofrezco">Ofrezco</option>
    <option value="Busco">Busco</option>
  </select>
</label>

        <button onClick={clearFilters}>Clear Filters</button>
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
            <strong>User ID:</strong> {post.user_id}
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
