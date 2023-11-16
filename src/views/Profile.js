import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        if (response.status === 200) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user profile.");
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDelete = async (id) => {
    console.log("Delete button clicked with id:", id);

    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Post deleted");
      } else {
        console.error(`Error deleting post: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdatePost = () => {
    setUpdatePost(true);
  };

  return (
    <div className="profile">
      <h1>My Profile</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Lastname: {user.lastname}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
  
          <h2>My Posts</h2>
          <div className="posts">
            {user.posts && user.posts.length > 0 ? (
              <ul>
                {user.posts.map((post) => (
                  <li key={post.id} className="singlePost">
                    <strong>Service:</strong> {post.service}
                    <br />
                    <strong>Price:</strong> {post.price}
                    <br />
                    <strong>Location:</strong> {post.location}
                    <br />
                    <strong>Option:</strong> {post.option}
                    <br />
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete Post
                    </button>
                    <button
                      className="updateButton"
                      onClick={() => handleUpdatePost(post.id)}
                    >
                      Update Post
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts found.</p>
            )}
          </div>
  
          {/* Conditional Form Display */}
          {updatePost && (
            <div className="updateForm">
              <form /*onSubmit={handleUpdate}*/ className="signUpForm">
          <input
            type="text"
            name="service"
            // value={updateUser.name}
            // onChange={handleUpdateInputChange}
            placeholder="Service"
          />
          <input
            type="text"
            name="price"
            //value={updateUser.lastname}
            //onChange={handleUpdateInputChange}
            placeholder="Price"
          />
          <input
            type="text"
            name="location  "
            //value={updateUser.username}
            //onChange={handleUpdateInputChange}
            placeholder="Location"
          />
          <button type="submit" className="createUserButton">Update Post</button>
          <button type="button" onClick={() => setUpdatePost(false)} className="createUserButton">Cancel</button>
        </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
}

export default Profile;
