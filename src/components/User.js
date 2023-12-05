import React, { useState, useEffect } from "react";
import "./User.css";

function User() {
  const [posts, setPosts] = useState([]);
 
  const [filterCriteria, setFilterCriteria] = useState({
    rut: "",
    responsable: "",
    cargo: "",
    division: "",
    area: "",
    movil: "",
    tipo_de_servicio: "",
    modelo_del_celular: "",
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

  

  useEffect(() => {
    getPosts();
  }, []);

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
      modelo_del_celular: "",
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
    setSearchButtonClicked(false);
    setAppliedFilters({});
  };

  const filteredPosts = posts.filter((post) => {
    const { serie, responsable, rut } = appliedFilters;
  
    const sanitizeRut = (value) => value.replace(/[-.]/g, "").toLowerCase(); // Convert to lowercase after removing dashes and dots
  
    return (
      (!serie || post.serie.toLowerCase().includes(serie.toLowerCase())) &&
      (!responsable ||
        post.responsable.toLowerCase().includes(responsable.toLowerCase())) &&
      (!rut || sanitizeRut(post.rut).includes(sanitizeRut(rut)))
    );
  });
  
  return (
    <div className="post">
      
      <div className="filters">
        <h2>Búsqueda Notebooks</h2>
        <div className="form-group">
    
          <input
            type="text"
            name="serie"
            placeholder="serie"
            value={filterCriteria.serie}
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
        <button onClick={handleSearchButtonClick} className="filter-button">Buscar</button>
        <button onClick={clearFilters} className="filter-button">Reiniciar</button>
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
            <div className="postCell">
              <strong>Modelo del Notebook:</strong> {post.modelo_del_notebook}
            </div>
            <div className="postCell">
              <strong>Marca del Notebook:</strong> {post.marca_del_notebook}
            </div>
            <div className="postCell">
              <strong>Serie:</strong> {post.serie}
            </div>
          </div>
          <div className="column-2">
            
            <div className="postCell">
              <strong>Activo Fijo:</strong> {post.activo_fijo}
            </div>
            <div className="postCell">
              <strong>Tipo:</strong> {post.tipo}
            </div>
            <div className="postCell">
              <strong>CPU:</strong> {post.cpu}
            </div>
            <div className="postCell">
              <strong>RAM:</strong> {post.ram}
            </div>
            <div className="postCell">
              <strong>Disco:</strong> {post.disco}
            </div>
            <div className="postCell">
              <strong>Sistema Operativo:</strong> {post.so}
            </div>
            <div className="postCell">
              <strong>Periféricos:</strong> {post.perifericos}
            </div>
            <div className="postCell">
              <strong>Observaciones Notebook:</strong>{" "}
              {post.observaciones_notebook}
            </div>
          </div>
        </div>
      ))}
  </div>
</div>
    </div>
  );
}

export default User;
