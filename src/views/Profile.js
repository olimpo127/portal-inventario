import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatePost, setUpdatePost] = useState(false);
  const [updateCurrentPost, setUpdateCurrentPost] = useState({
    id: "",
    rut: "",
    responsable: "",
    cargo: "",
    division: "",
    area: "",
    movil: "",
    tipo_de_servicio: "",
    modelo_del_celular: "",
    marca_del_celular: "",
    imei: "",
    observaciones_celular: "",
    modelo_del_notebook: "",
    marca_del_notebook: "",
    serie: "",
    activo_fijo: "",
    tipo: "",
    cpu: "",
    ram: "",
    disco: "",
    so: "",
    perifericos: "",
    observaciones_notebook: "",
    user_id: "",
  });
  const [postDeleted, setPostDeleted] = useState(false);
  const [postUpdated, setPostUpdated] = useState(false);

  // Add a new state variable for the filter
  const [rutFilter, setRutFilter] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  // Modify the rendering logic to filter posts based on rut
  const filteredPosts = (user.posts ?? []).filter((post) =>
    searchClicked ? post.rut.includes(rutFilter) : true
  );


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (searchClicked) {
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
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [searchClicked, postDeleted, postUpdated, rutFilter]); 
  

  const handleDelete = async (id) => {
    console.log("Delete button clicked with id:", id);

    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Post deleted");
        setPostDeleted(true);
        setTimeout(() => {
          setPostDeleted(false);
        }, 3000);
      } else {
        console.error(`Error deleting post: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/posts/${updateCurrentPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateCurrentPost),
        }
      );

      if (response.ok) {
        console.log("Post updated");
        setPostUpdated(true);
        setUpdatePost(false);
        setTimeout(() => {
          setPostUpdated(false);
        }, 3000);
      } else {
        console.error(`Error updating post: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdatePost = (postId) => {
    setUpdatePost(true);
    const postToUpdate = user.posts.find((post) => post.id === postId);
    setUpdateCurrentPost({
      id: postToUpdate.id,
      rut: postToUpdate.rut,
      responsable: postToUpdate.responsable,
      cargo: postToUpdate.cargo,
      division: postToUpdate.division,
      area: postToUpdate.area,
      movil: postToUpdate.movil,
      tipo_de_servicio: postToUpdate.tipo_de_servicio,
      modelo_del_celular: postToUpdate.modelo_del_celular,
      marca_del_celular: postToUpdate.marca_del_celular,
      imei: postToUpdate.imei,
      observaciones_celular: postToUpdate.observaciones_celular,
      modelo_del_notebook: postToUpdate.modelo_del_notebook,
      marca_del_notebook: postToUpdate.marca_del_notebook,
      serie: postToUpdate.serie,
      activo_fijo: postToUpdate.activo_fijo,
      tipo: postToUpdate.tipo,
      cpu: postToUpdate.cpu,
      ram: postToUpdate.ram,
      disco: postToUpdate.disco,
      so: postToUpdate.so,
      perifericos: postToUpdate.perifericos,
      observaciones_notebook: postToUpdate.observaciones_notebook,
      user_id: postToUpdate.user_id,
    });
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateCurrentPost({ ...updateCurrentPost, [name]: value });
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  return (
    <div className="profile">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <h2>Manage Users</h2>

          <input
        type="text"
        placeholder="Filter by rut"
        value={rutFilter}
        onChange={(e) => setRutFilter(e.target.value)}
        className="rutFilter"
      />
      <button onClick={handleSearchClick} className="searchButton">Search</button>


      {searchClicked && (
        <div className="posts">
          {filteredPosts && filteredPosts.length > 0 ? (
            <ul>
              {filteredPosts.map((post) => (
                <li key={post.id} className="singlePost">
                    <strong>rut:</strong> {post.rut}
                    <br />
                    <strong>responsable:</strong> {post.responsable}
                    <br />
                    <strong>cargo:</strong> {post.cargo}
                    <br />
                    <strong>division:</strong> {post.division}
                    <br />
                    <strong>area:</strong> {post.area}
                    <br />
                    <strong>movil:</strong> {post.movil}
                    <br />
                    <strong>tipo_de_servicio:</strong> {post.tipo_de_servicio}
                    <br />
                    <strong>modelo_del_celular:</strong>{" "}
                    {post.modelo_del_celular}
                    <br />
                    <strong>marca_del_celular:</strong> {post.marca_del_celular}
                    <br />
                    <strong>imei:</strong> {post.imei}
                    <br />
                    <strong>observaciones_celular:</strong>{" "}
                    {post.observaciones_celular}
                    <br />
                    <strong>modelo_del_notebook:</strong>{" "}
                    {post.modelo_del_notebook}
                    <br />
                    <strong>marca_del_notebook:</strong>{" "}
                    {post.marca_del_notebook}
                    <br />
                    <strong>serie:</strong> {post.serie}
                    <br />
                    <strong>activo fijo:</strong> {post.activo_fijo}
                    <br />
                    <strong>cpu:</strong> {post.cpu}
                    <br />
                    <strong>ram:</strong> {post.ram}
                    <br />
                    <strong>disco:</strong> {post.disco}
                    <br />
                    <strong>sistema operativo:</strong> {post.so}
                    <br />
                    <strong>perifericos:</strong> {post.perifericos}
                    <br />
                    <strong>observaciones_notebook:</strong>{" "}
                    {post.observaciones_notebook}
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
                      Update User
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </div>

          )}
          {updatePost && (
            <div className="updateForm">
              <form onSubmit={handleUpdate} className="signUpForm">
                <input
                  type="text"
                  name="responsable"
                  value={updateCurrentPost.responsable}
                  onChange={handleUpdateInputChange}
                  placeholder="responsable"
                />
                <input
                  type="text"
                  name="rut"
                  value={updateCurrentPost.rut}
                  onChange={handleUpdateInputChange}
                  placeholder="rut"
                />
                <input
                  type="text"
                  name="cargo"
                  value={updateCurrentPost.cargo}
                  onChange={handleUpdateInputChange}
                  placeholder="cargo"
                />
                <input
                  type="text"
                  name="division"
                  value={updateCurrentPost.division}
                  onChange={handleUpdateInputChange}
                  placeholder="division"
                />
                <input
                  type="text"
                  name="area"
                  value={updateCurrentPost.area}
                  onChange={handleUpdateInputChange}
                  placeholder="area"
                />
                <input
                  type="text"
                  name="movil"
                  value={updateCurrentPost.movil}
                  onChange={handleUpdateInputChange}
                  placeholder="movil"
                />
                <input
                  type="text"
                  name="tipo_de_servicio"
                  value={updateCurrentPost.tipo_de_servicio}
                  onChange={handleUpdateInputChange}
                  placeholder="tipo_de_servicio"
                />
                <input
                  type="text"
                  name="modelo_del_celular"
                  value={updateCurrentPost.modelo_del_celular}
                  onChange={handleUpdateInputChange}
                  placeholder="modelo_del_celular"
                />
                <input
                  type="text"
                  name="marca_del_celular"
                  value={updateCurrentPost.marca_del_celular}
                  onChange={handleUpdateInputChange}
                  placeholder="marca_del_celular"
                />
                <input
                  type="text"
                  name="imei"
                  value={updateCurrentPost.imei}
                  onChange={handleUpdateInputChange}
                  placeholder="imei"
                />
                <input
                  type="text"
                  name="observaciones_celular"
                  value={updateCurrentPost.observaciones_celular}
                  onChange={handleUpdateInputChange}
                  placeholder="observaciones_celular"
                />
                <input
                  type="text"
                  name="modelo_del_notebook"
                  value={updateCurrentPost.modelo_del_notebook}
                  onChange={handleUpdateInputChange}
                  placeholder="modelo_del_notebook"
                />
                <input
                  type="text"
                  name="marca_del_notebook"
                  value={updateCurrentPost.marca_del_notebook}
                  onChange={handleUpdateInputChange}
                  placeholder="marca_del_notebook"
                />
                <input
                  type="text"
                  name="serie"
                  value={updateCurrentPost.serie}
                  onChange={handleUpdateInputChange}
                  placeholder="serie"
                />
                <input
                  type="text"
                  name="tipo"
                  value={updateCurrentPost.tipo}
                  onChange={handleUpdateInputChange}
                  placeholder="tipo"
                />
                <input
                  type="text"
                  name="cpu"
                  value={updateCurrentPost.cpu}
                  onChange={handleUpdateInputChange}
                  placeholder="cpu"
                />
                <input
                  type="text"
                  name="ram"
                  value={updateCurrentPost.ram}
                  onChange={handleUpdateInputChange}
                  placeholder="ram"
                />
                <input
                  type="text"
                  name="disco"
                  value={updateCurrentPost.disco}
                  onChange={handleUpdateInputChange}
                  placeholder="disco"
                />
                <input
                  type="text"
                  name="so"
                  value={updateCurrentPost.so}
                  onChange={handleUpdateInputChange}
                  placeholder="so"
                />
                <input
                  type="text"
                  name="perifericos"
                  value={updateCurrentPost.perifericos}
                  onChange={handleUpdateInputChange}
                  placeholder="perifericos"
                />
                <input
                  type="text"
                  name="observaciones_notebook"
                  value={updateCurrentPost.observaciones_notebook}
                  onChange={handleUpdateInputChange}
                  placeholder="observaciones_notebook"
                />

                <br />
                <button type="submit" className="createUserButton">
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => setUpdatePost(false)}
                  className="createUserButton"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          {/* Display messages */}
          {postDeleted && (
            <p className="delete-message">Post deleted successfully!</p>
          )}
          {postUpdated && (
            <p className="update-message">Post updated successfully!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;