import React, { useState } from "react";
import "./ParkAdm.css";

export default function ParkingBackgroundPage() {
    const [vehiculos, setVehiculos] = useState([]);
    const [nuevoVehiculo, setNuevoVehiculo] = useState("");
    const [nuevoPrecio, setNuevoPrecio] = useState("");
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);

    // Nuevos campos
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
        <div className="parking-bg">
            <div className="content-box ">
                <h1 className="header-with-logo">
                    <img src="/src/assets/img/logo-easyPark.jpeg" alt="EasyPark Logo" className="logo" />
                    Parqueo/Garaje
                </h1>

                <div className="form-section">
                    <input
                        type="text"
                        placeholder="Nombre del parqueo/garaje"
                        className="easypark-input"
                        value={nombreParqueo}
                        onChange={(e) => setNombreParqueo(e.target.value)}
                    />
               </div>
                <div className="form-section">
                    <input
                        type="text"
                        placeholder="Tamaño del espacio del parqueo"
                        className="easypark-input"
                        value={tamanoEspacio}
                        onChange={(e) => setTamanoEspacio(e.target.value)}
                    />  
                </div>
                    
                <div className="form-section">
                    <input
                        type="number"
                        placeholder="Cantidad de campos"
                        className="easypark-input"
                        value={cantidadCampos}
                        onChange={(e) => setCantidadCampos(e.target.value)}
                    />
                 </div>
                <div className="form-section">
                    
                    <input
                        type="text"
                        placeholder="Longitud"
                        className="easypark-input"
                        value={longitud}
                        onChange={(e) => setLongitud(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Latitud"
                        className="easypark-input"
                        value={latitud}
                        onChange={(e) => setLatitud(e.target.value)}
                    />
                </div>

                <div className="input-row">
                    <input
                        type="text"
                        placeholder="Tipo de vehículo"
                        value={nuevoVehiculo}
                        onChange={(e) => setNuevoVehiculo(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && agregarVehiculo()}
                        className="easypark-input"
                    />
                    <input
                        type="text"
                        placeholder="Precio"
                        value={nuevoPrecio}
                        onChange={(e) => setNuevoPrecio(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && agregarVehiculo()}
                        className="easypark-input"
                    />
                    <button className="add-btn" onClick={agregarVehiculo}>+</button>
                    <button className="delete-btn" onClick={eliminarVehiculo}>-</button>
                </div>

                <table className="easypark-table">
                    <thead>
                        <tr>
                            <th>Vehículo</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiculos.length === 0 ? (
                            <tr><td colSpan="2" style={{ textAlign: "center" }}>No hay vehículos registrados</td></tr>
                        ) : (
                            vehiculos.map((v, i) => (
                                <tr
                                    key={i}
                                    onClick={() => setFilaSeleccionada(i)}
                                    className={filaSeleccionada === i ? "selected-row" : ""}
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
    );
}
