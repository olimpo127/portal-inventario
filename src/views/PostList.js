import React, { useState, useEffect } from "react";
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filterRut, setFilterRut] = useState("");
  const [filterMovil, setFilterMovil] = useState("");
  const [filterSerie, setFilterSerie] = useState("");
  const [filterResponsable, setFilterResponsable] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
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
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const token = localStorage.getItem("jwtToken");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  const [newPost, setNewPost] = useState({
    rut: "",
    responsable: "",
    cargo: "",
    division: "",
    area: "",
    movil: "",
    tipo_de_servicio: "",
    marca_del_celular: "",
    modelo_del_celular: "",
    imei: "",
    observaciones_celular: "",
    modelo_del_notebook: "",
    marca_del_notebook: "",
    serie: "",
    tipo: "",
    cpu: "",
    ram: "",
    disco: "",
    so: "",
    perifericos: "",
    observaciones_notebook: "",
    user_id: "",
  });

  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  //const [showFiltersForm, setShowFiltersForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        console.error("Error creating post:", response.statusText);
        const errorMessage = await response.text();
        setSuccessMessage(`Error creating post: ${errorMessage}`);
        return;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Post created:", data);
      } else {
        const textResponse = await response.text();
        console.log("Post created (plain text):", textResponse);
      }

      setSuccessMessage("User created successfully!");
      setNewPost({
        rut: "",
        responsable: "",
        cargo: "",
        division: "",
        area: "",
        movil: "",
        tipo_de_servicio: "",
        marca_del_celular: "",
        modelo_del_celular: "",
        imei: "",
        observaciones_celular: "",
        modelo_del_notebook: "",
        marca_del_notebook: "",
        serie: "",
        tipo: "",
        cpu: "",
        ram: "",
        disco: "",
        so: "",
        perifericos: "",
        observaciones_notebook: "",
        user_id: "",
      });
      setShowCreatePostForm(false);
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Error creating post");
    }
  };

  useEffect(() => {
    // Fetch all posts from the backend
    fetch("http://localhost:5000/posts/list")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  useEffect(() => {
    // Filter posts based on the case-insensitive and symbol-insensitive filters
    const filtered = posts.filter(
      (post) =>
        post.rut
          .replace(/[-.]/g, '')  // Remove '-' and '.' from post.rut
          .toLowerCase()
          .includes(
            filterRut
              .replace(/[-.]/g, '')  // Remove '-' and '.' from filterRut
              .toLowerCase()
          ) //&& post.responsable.toLowerCase().includes(filterResponsable.toLowerCase()) 
        
        //post.serie.includes(filterSerie)
    );
    setFilteredPosts(filtered);
  }, [filterRut, filterMovil, filterSerie, posts]);

  const handleDelete = async (id) => {
    // Delete post by ID
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        // Remove the deleted post from the state
        setFilteredPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== id)
        );
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleUpdate = (id) => {
    // Show the update form and set the selected post ID
    setShowUpdateForm(true);
    setSelectedPostId(id);

    // Set the update form data based on the selected post
    const postToUpdate = posts.find((post) => post.id === id);
    setUpdateFormData(postToUpdate);
  };

  const handleSubmitUpdate = async () => {
    // Send a PUT request to update the post with selectedPostId
    try {
      const response = await fetch(
        `http://localhost:5000/posts/${selectedPostId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateFormData),
        }
      );

      if (response.status === 200) {
        // Update the post in the state
        setFilteredPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === selectedPostId ? { ...post, ...updateFormData } : post
          )
        );

        // Reset the form data and hide the update form
        setUpdateFormData({
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
        });
        setShowUpdateForm(false);
      } else {
        console.error("Error updating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by rut"
        value={filterRut}
        onChange={(e) => setFilterRut(e.target.value)}
        className="filterInput"
      />
      
      {/* <input
        type="text"
        placeholder="Filter by responsable"
        value={filterResponsable}
        onChange={(e) => setFilterResponsable(e.target.value)}
        className="filterInput"
      />

      <input
        type="text"
        placeholder="Filter by movil"
        value={filterMovil}
        onChange={(e) => setFilterMovil(e.target.value)}
        className="filterInput"
      />

      <input
        type="text"
        placeholder="Filter by serie"
        value={filterSerie}
        onChange={(e) => setFilterSerie(e.target.value)}
        className="filterInput"
      /> */}

      <button
        onClick={() => setShowCreatePostForm(!showCreatePostForm)}
        className="displayButton"
      >
        {showCreatePostForm ? "Hide Form" : "Create a new User"}
      </button>
      {showCreatePostForm && (
        <form onSubmit={handleFormSubmit}>
          <h2>Crear Usuario</h2>
          <div className="createNewPost">
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="responsable">Responsable:</label>
                <input
                  type="responsable"
                  id="responsable"
                  name="responsable"
                  placeholder="Apellidos Nombres"
                  value={newPost.responsable}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rut">Rut:</label>
                <input
                  type="text"
                  id="rut"
                  name="rut"
                  placeholder="xx.xxx.xxx-x"
                  value={newPost.rut}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cargo">Cargo:</label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  value={newPost.cargo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="division">Division:</label>
                <input
                  type="text"
                  id="division"
                  name="division"
                  value={newPost.division}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="area">Area:</label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={newPost.area}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="movil">Movil:</label>
                <input
                  type="text"
                  id="movil"
                  name="movil"
                  placeholder="9xxxxxxxx"
                  value={newPost.movil}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="tipo_de_servicio">Tipo de servicio:</label>
                <input
                  type="text"
                  id="tipo_de_servicio"
                  name="tipo_de_servicio"
                  value={newPost.tipo_de_servicio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modelo_del_celular">Modelo celular:</label>
                <input
                  type="text"
                  id="modelo_del_celular"
                  name="modelo_del_celular"
                  value={newPost.modelo_del_celular}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="marca_del_celular">Marca celular:</label>
                <input
                  type="text"
                  id="marca_del_celular"
                  name="marca_del_celular"
                  value={newPost.marca_del_celular}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imei">IMEI:</label>
                <input
                  type="text"
                  id="imei"
                  name="imei"
                  value={newPost.imei}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="observaciones_celular">
                  Observaciones celular:
                </label>
                <input
                  type="text"
                  id="observaciones_celular"
                  name="observaciones_celular"
                  value={newPost.observaciones_celular}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-container">
              <div className="form-group">
                <label htmlFor="modelo_del_notebook">
                  Modelo notebook:
                </label>
                <input
                  type="text"
                  id="modelo_del_notebook"
                  name="modelo_del_notebook"
                  value={newPost.modelo_del_notebook}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="marca_del_notebook">Marca:</label>
                <input
                  type="text"
                  id="marca_del_notebook"
                  name="marca_del_notebook"
                  value={newPost.marca_del_notebook}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="serie">Serie:</label>
                <input
                  type="text"
                  id="serie"
                  name="serie"
                  value={newPost.serie}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="activo_fijo">Activo fijo:</label>
                <input
                  type="text"
                  id="activo_fijo"
                  name="activo_fijo"
                  value={newPost.activo_fijo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tipo">Tipo:</label>
                <input
                  type="text"
                  id="tipo"
                  name="tipo"
                  value={newPost.tipo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpu">CPU:</label>
                <input
                  type="text"
                  id="cpu"
                  name="cpu"
                  value={newPost.cpu}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="ram">RAM:</label>
                <input
                  type="text"
                  id="ram"
                  name="ram"
                  value={newPost.ram}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="disco">Disco:</label>
                <input
                  type="text"
                  id="disco"
                  name="disco"
                  value={newPost.disco}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="so">Sistema operativo:</label>
                <input
                  type="text"
                  id="so"
                  name="so"
                  value={newPost.so}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="perifericos">Perifericos:</label>
                <input
                  type="text"
                  id="perifericos"
                  name="perifericos"
                  value={newPost.perifericos}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="observaciones_notebook">
                  Observaciones notebook:
                </label>
                <input
                  type="text"
                  id="observaciones_notebook"
                  name="observaciones_notebook"
                  value={newPost.observaciones_notebook}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>

              <button type="submit" className="createButton">
                Create a new User
              </button>
              <p></p>

              <button
                type="submit"
                className="createButton"
                onClick={() => setShowCreatePostForm(!showCreatePostForm)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <div key={post.id} className="singlePost">
            <div className="column-1">
              <strong>Datos Usuario</strong>
              <p></p>
              <div className="postCell">
                <strong>Responsable:</strong> {post.responsable}
              </div>
              <div className="postCell">
                <strong>RUT:</strong> {post.rut}
              </div>
              <div className="postCell">
                <strong>Cargo:</strong> {post.cargo}
              </div>
              <div className="postCell">
                <strong>Division:</strong> {post.division}
              </div>
              <div className="postCell">
                <strong>Area:</strong> {post.area}
              </div>
            </div>

            <div className="column-2">
              <strong>Datos Celular</strong>
              <p></p>
              <div className="postCell">
                <strong>Movil:</strong> {post.movil}
              </div>
              <div className="postCell">
                <strong>Modelo del Celular:</strong> {post.modelo_del_celular}
              </div>
              <div className="postCell">
                <strong>Marca del Celular:</strong> {post.marca_del_celular}
              </div>
              <div className="postCell">
                <strong>IMEI:</strong> {post.imei}
              </div>
              <div className="postCell">
                <strong>Observaciones del Celular:</strong>{" "}
                {post.observaciones_celular}
              </div>
            </div>

            <div className="column-3">
              <strong>Datos Notebook</strong>
              <p></p>
              <div className="postCell">
                <strong>Modelo notebook:</strong> {post.modelo_del_notebook}
              </div>
              <div className="postCell">
                <strong>Marca notebook:</strong> {post.marca_del_notebook}
              </div>
              <div className="postCell">
                <strong>Serie:</strong> {post.serie}
              </div>
              <div className="postCell">
                <strong>Activo fijo:</strong> {post.activo_fijo}
              </div>
              <div className="postCell">
                <strong>Tipo:</strong> {post.tipo}
              </div>
              <div className="postCell">
                <strong>Cpu:</strong> {post.cpu}
              </div>
              <div className="postCell">
                <strong>RAM:</strong> {post.ram}
              </div>
              <div className="postCell">
                <strong>Disco:</strong> {post.disco}
              </div>
              <div className="postCell">
                <strong>Sistema operativo:</strong> {post.so}
              </div>
              <div className="postCell">
                <strong>Perifericos:</strong> {post.perifericos}
              </div>
              <div className="postCell">
                <strong>Observaciones notebook:</strong>{" "}
                {post.observaciones_notebook}
              </div>
            </div>
          </div>

          <div className="button-container">
            <button
              onClick={() => handleUpdate(post.id)}
              className="updateButton"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              className="deleteButton"
            >
              Delete
            </button>
            {/* Display other post details as needed */}
          </div>
          {/* Update Form */}
          {showUpdateForm && selectedPostId === post.id && (
            <div>
              <h2>Update Post</h2>
              <div className="update-form-container">
                <div className="form-group">
                  <div>
                    rut:
                    <input
                      type="text"
                      value={updateFormData.rut}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          rut: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    Responsable:
                    <input
                      type="text"
                      value={updateFormData.responsable}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          responsable: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Cargo:
                    <input
                      type="text"
                      value={updateFormData.cargo}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          cargo: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Division:
                    <input
                      type="text"
                      value={updateFormData.division}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          division: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Area:
                    <input
                      type="text"
                      value={updateFormData.area}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          area: e.target.value,
                        })
                      }
                    />
                  </div>

                  
                </div>

                <div className="form-group">
                <div>
                    Movil:
                    <input
                      type="text"
                      value={updateFormData.movil}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          movil: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Tipo de Servicio:
                    <input
                      type="text"
                      value={updateFormData.tipo_de_servicio}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          tipo_de_servicio: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Modelo del Celular:
                    <input
                      type="text"
                      value={updateFormData.modelo_del_celular}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          modelo_del_celular: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    Marca del Celular:
                    <input
                      type="text"
                      value={updateFormData.marca_del_celular}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          marca_del_celular: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    IMEI:
                    <input
                      type="text"
                      value={updateFormData.imei}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          imei: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Observaciones del Celular:
                    <input
                      type="text"
                      value={updateFormData.observaciones_celular}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          observaciones_celular: e.target.value,
                        })
                      }
                    />
                  </div>

                  
                </div>

                <div className="form-group">
                <div>
                    Modelo del Notebook:
                    <input
                      type="text"
                      value={updateFormData.modelo_del_notebook}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          modelo_del_notebook: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Marca del Notebook:
                    <input
                      type="text"
                      value={updateFormData.marca_del_notebook}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          marca_del_notebook: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Numero de Serie:
                    <input
                      type="text"
                      value={updateFormData.serie}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          serie: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Activo Fijo:           
                    <input
                      type="text"
                      value={updateFormData.activo_fijo}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          activo_fijo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    Tipo:
                    <input
                      type="text"
                      value={updateFormData.tipo}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          tipo: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    CPU:
                    <input
                      type="text"
                      value={updateFormData.cpu}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          cpu: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    RAM:
                    <input
                      type="text"
                      value={updateFormData.ram}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          ram: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Disco:
                    <input
                      type="text"
                      value={updateFormData.disco}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          disco: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Sistema Operativo:
                    <input
                      type="text"
                      value={updateFormData.so}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          so: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Perifericos:
                    <input
                      type="text"
                      value={updateFormData.perifericos}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          perifericos: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    Observaciones del Notebook:
                    <input
                      type="text"
                      value={updateFormData.observaciones_notebook}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          observaciones_notebook: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="button-container">
                <button onClick={handleSubmitUpdate} className="updateButton">
                  Submit
                </button>
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="deleteButton"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;