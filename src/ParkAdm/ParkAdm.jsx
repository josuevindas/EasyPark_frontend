import React, { useState } from "react";
import "./ParkAdm.css";

export default function ParkingBackgroundPage() {
    const [vehiculos, setVehiculos] = useState([]);
    const [nuevoVehiculo, setNuevoVehiculo] = useState("");
    const [nuevoPrecio, setNuevoPrecio] = useState("");
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [tipoParqueo, setTipoParqueo] = useState("");
    
    const [nombreParqueo, setNombreParqueo] = useState("");
    const [tamanoEspacio, setTamanoEspacio] = useState("");
    const [cantidadCampos, setCantidadCampos] = useState("");
    const [longitud, setLongitud] = useState("");
    const [latitud, setLatitud] = useState("");

    const agregarVehiculo = () => {
        if (nuevoVehiculo.trim() && !isNaN(nuevoPrecio) && nuevoPrecio.trim()) {
            setVehiculos([...vehiculos, { tipo: nuevoVehiculo, precio: nuevoPrecio }]);
            setNuevoVehiculo("");
            setNuevoPrecio("");
        }
    };

    const eliminarVehiculo = () => {
        if (filaSeleccionada !== null) {
            const copia = [...vehiculos];
            copia.splice(filaSeleccionada, 1);
            setVehiculos(copia);
            setFilaSeleccionada(null);
        }
    };

    return (
        <div className="parking-bg container-fluid py-4">
        <div className="content-box mx-auto p-4 shadow rounded bg-white bg-opacity-75">
          <h1 className="header-with-logo text-center mb-4 d-flex justify-content-center align-items-center gap-3">
            Parqueo/Garaje
          </h1>
          
          <div className="row g-2 mb-3 justify-content-center">
             <div className="col-md-6">
                <select
                    className="form-select"
                    
                    aria-label="Default select example"
               >
                    <option value="Estacionamientos">Estacionamientos</option>
                    <option value="Garajes Privados">Garajes Privados</option>
                </select>
            </div>
        </div>

          <div className="row g-2 mb-3 justify-content-center">
            <div className="col-md-6">
              <input type="text" placeholder="Nombre del parqueo/garaje" className="form-control"
                value={nombreParqueo} onChange={(e) => setNombreParqueo(e.target.value)} />
            </div>
          </div>
      
          <div className="row g-2 mb-3 justify-content-center">
            <div className="col-md-6">
              <input type="text" placeholder="Tamaño del espacio del parqueo" className="form-control"
                value={tamanoEspacio} onChange={(e) => setTamanoEspacio(e.target.value)} />
            </div>
          </div>
      
          <div className="row g-2 mb-3 justify-content-center">
            <div className="col-md-3">
              <input type="number" placeholder="Cantidad de campos" className="form-control"
                value={cantidadCampos} onChange={(e) => setCantidadCampos(e.target.value)} />
            </div>
          </div>
      
          <div className="row g-2 mb-3 justify-content-center">
            <div className="col-md-3">
              <input type="text" placeholder="Longitud" className="form-control"
                value={longitud} onChange={(e) => setLongitud(e.target.value)} />
            </div>
            <div className="col-md-3">
              <input type="text" placeholder="Latitud" className="form-control"
                value={latitud} onChange={(e) => setLatitud(e.target.value)} />
            </div>
          </div>
      
          <div className="row g-2 mb-3 justify-content-center">
            <div className="col-md-3">
              <input type="text" placeholder="Tipo de vehículo" className="form-control"
                value={nuevoVehiculo}
                onChange={(e) => setNuevoVehiculo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && agregarVehiculo()}
              />
            </div>
            <div className="col-md-3">
              <input type="text" placeholder="Precio" className="form-control"
                value={nuevoPrecio}
                onChange={(e) => setNuevoPrecio(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && agregarVehiculo()}
              />
            </div>
            <div className="col-auto d-flex gap-2 align-items-center">
              <button className="btn btn-primary" onClick={agregarVehiculo}>+</button>
              <button className="btn btn-danger" onClick={eliminarVehiculo}>-</button>
            </div>
          </div>
      
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>Vehículo</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.length === 0 ? (
                  <tr><td colSpan="2">No hay vehículos registrados</td></tr>
                ) : (
                  vehiculos.map((v, i) => (
                    <tr
                      key={i}
                      className={filaSeleccionada === i ? "table-primary fw-bold" : ""}
                      onClick={() => setFilaSeleccionada(i)}
                    >
                      <td>{v.tipo}</td>
                      <td>{v.precio}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    );
}
