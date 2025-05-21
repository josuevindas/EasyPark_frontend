import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MisPropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("easypark_token");
    const id = localStorage.getItem("iduser");
    if (!token) return navigate("/");

    fetch(`http://localhost:3001/api/propiedades/mis/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setPropiedades(data))
      .catch(err => console.error("Error:", err));
  }, []);

  const handleEditar = (propiedad) => {
    navigate(`/EditarPropiedad/${propiedad.id}/${propiedad.tipo}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Mis propiedades</h2>

      {/* TABLA EN PANTALLAS GRANDES */}
      <div className="d-none d-md-block table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Tipo</th>
              <th>Dirección</th>
              <th>Disponibilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {propiedades.length === 0 ? (
              <tr>
                <td colSpan="4">No tienes propiedades registradas</td>
              </tr>
            ) : (
              propiedades.map((p, i) => (
                <tr key={i}>
                  <td>{p.tipo}</td>
                  <td>{p.direccion}</td>
                  <td>{p.disponibilidad}</td>
                  <td>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEditar(p)}>Editar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CARDS EN MÓVIL */}
      <div className="d-block d-md-none">
        {propiedades.length === 0 ? (
          <p className="text-center">No tienes propiedades registradas</p>
        ) : (
          propiedades.map((p, i) => (
            <div key={i} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{p.tipo}</h5>
                <p className="card-text"><strong>Dirección:</strong> {p.direccion}</p>
                <p className="card-text"><strong>Disponibilidad:</strong> {p.disponibilidad}</p>
                <button className="btn btn-warning w-100" onClick={() => handleEditar(p)}>Editar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
