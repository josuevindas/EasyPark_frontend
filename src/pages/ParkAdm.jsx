import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/css/ParkAdm.css';

export const ParkAdm = () =>  {
    const [vehiculos, setVehiculos] = useState([]);
    const [nuevoVehiculo, setNuevoVehiculo] = useState("");
    const [nuevoPrecio, setNuevoPrecio] = useState("");
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [tipoParqueo, setTipoParqueo] = useState("");
    const [horario, setHorario] = useState("");
    const [nombreParqueo, setNombreParqueo] = useState("");
    const [alturaEspacio, setAlturaEspacio] = useState("");
    const [anchuraEspacio, setAnchuraEspacio] = useState("");
    const [cantidadCampos, setCantidadCampos] = useState("");
    const [longitud, setLongitud] = useState("");
    const [direccion, setDireccion] = useState("");
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
                    value={tipoParqueo}
                    onChange={(e) => setTipoParqueo(e.target.value)}
                    aria-label="Default select example"
               >
                    <option value="">Selecciona tipo de parqueo</option>
                    <option value="Estacionamientos">Estacionamientos</option>
                    <option value="Garajes Privados">Garajes Privados</option>
                </select>
            </div>
        </div>

         
      <div className="row g-2 mb-3 justify-content-center">
        <div className="row g-2 mb-3 justify-content-center">
              <div className="col-md-6">
                <input type="text" placeholder="Nombre del parqueo/garaje" className="form-control"
                  value={nombreParqueo} onChange={(e) => setNombreParqueo(e.target.value)} />
              </div>
            </div>
            <div className="row g-2 mb-3 justify-content-center">
          <div className="col-md-6">
            <input type="text" placeholder="Dirección del parqueo/garaje" className="form-control"
              value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
        </div>
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
              <div className="col-md-5">
                <input type="number" placeholder="Altura del campo (m)" className="form-control"
                  value={alturaEspacio} onChange={(e) => setAlturaEspacio(e.target.value)} />
              </div>
              <div className="col-md-5">
                <input type="number" placeholder="Anchura del campo(m)" className="form-control"
                  value={anchuraEspacio} onChange={(e) => setAnchuraEspacio(e.target.value)} />
              </div>
            </div>

      
            
              <div className="row g-2 mb-3 justify-content-center">
                <div className="col-md-5">
                  <input type="number" placeholder="Cantidad de campos" className="form-control"
                    value={cantidadCampos} onChange={(e) => setCantidadCampos(e.target.value)} />
                </div>
              </div>
          
            <div className="row g-2 mb-3 justify-content-center">
              <div className="col-md-3">
                <input type="text" placeholder="Horario" className="form-control"
                  value={horario} onChange={(e) => setHorario(e.target.value)} onFocus={(e) => e.target.select()}/>
              </div>
            </div>

      
         
      
          <div className="row g-2 mb-3 justify-content-center">
            <div className="col-md-4">
              <input type="text" placeholder="Tipo de vehículo" className="form-control"
                value={nuevoVehiculo}
                onChange={(e) => setNuevoVehiculo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && agregarVehiculo()}
              />
            </div>
            <div className="col-md-2">
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
          <div className="row mt-4 justify-content-center">
            <div className="col-md-4 text-center">
              <button className="btn btn-primary w-100">Registrar</button>
            </div>
          </div>
        </div>
      </div>
      
    );
}
