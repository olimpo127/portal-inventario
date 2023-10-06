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
  
    useEffect(() => {
      getPosts();
    }, []);
  
    const getPosts = () => {
      fetch("http://localhost:5000/posts/list")
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error:", error));
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewPost({ ...newPost, [name]: value });
    };
  
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
            console.error('Error deleting user');
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

  return (
    <div className="post">
      <form onSubmit={handleFormSubmit}>
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
        <button type="submit" className="createButton">Create</button>
      </form>

      <div>
        <h2>Posts:</h2>
        <ul>
          {posts.map((post, index) => (
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
    </div>
  );
}

export default Post;
