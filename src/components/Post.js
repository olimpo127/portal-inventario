import React, { useState, useEffect } from "react";
import "./Post.css";

function Post() {
  const [posts, setPosts] = useState([]);

  const [filterCriteria, setFilterCriteria] = useState({
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

  const [appliedFilters, setAppliedFilters] = useState({});

  const token = localStorage.getItem("jwtToken");

  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  };

  const getPosts = () => {
    fetch("http://localhost:5000/posts/list")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (searchButtonClicked) {
      getPosts();
    }
  }, [searchButtonClicked]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const handleSearchButtonClick = () => {
    setSearchButtonClicked(true);
    setAppliedFilters({ ...filterCriteria });
  };

  const clearFilters = () => {
    setFilterCriteria({
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
    setSearchButtonClicked(false);
    setAppliedFilters({});
  };

  const filteredPosts = posts.filter((post) => {
    const { movil, responsable, rut } = appliedFilters;
  
    const sanitizeRut = (value) => value.replace(/[-.]/g, "").toLowerCase(); // Convert to lowercase after removing dashes and dots
  
    return (
      (!movil || post.movil.toLowerCase().includes(movil.toLowerCase())) &&
      (!responsable ||
        post.responsable.toLowerCase().includes(responsable.toLowerCase())) &&
      (!rut || sanitizeRut(post.rut).includes(sanitizeRut(rut)))
    );
  });
  

  return (
    <div className="post">
      <div className="filters">
        <h2>Búsqueda Celulares</h2>
        <div className="form-group">
          <input
            type="text"
            name="movil"
            placeholder="movil"
            value={filterCriteria.movil}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="responsable"
            placeholder="responsable"
            value={filterCriteria.responsable}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="rut"
            placeholder="rut"
            value={filterCriteria.rut}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group"></div>
        <button onClick={handleSearchButtonClick} className="filter-button">
          Buscar
        </button>
        <button onClick={clearFilters} className="filter-button">
          Reiniciar
        </button>
      </div>

      <div className="posts">
        <h2>Usuarios:</h2>
        <div className="postGrid">
          {searchButtonClicked &&
            filteredPosts.map((post) => (
              <div key={post.id} className="singlePost">

                <div className="column-1">
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
                  <div className="postCell">
                    <strong>Movil:</strong> {post.movil}
                  </div>
                  <div className="postCell">
                    <strong>Modelo del Celular:</strong>{" "}
                    {post.modelo_del_celular}
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

              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
