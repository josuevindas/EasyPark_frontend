import React, { useState } from "react";
import "./ParkAdm.css";

export default function ParkingBackgroundPage() {
    const [vehiculos, setVehiculos] = useState([]);
    const [nuevoVehiculo, setNuevoVehiculo] = useState("");
    const [nuevoPrecio, setNuevoPrecio] = useState("");
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);

    const agregarVehiculo = () => {
        if (nuevoVehiculo.trim() && nuevoPrecio.trim()) {
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
            <div className="content-box">
                <h1 className="header-with-logo">
                    <img src="/imglogo.jpg" alt="EasyPark Logo" className="logo" />
                    Parqueo/Garaje
                </h1>
                <div  className="nombre-parqueo">

                    <input
                        type="text"
                        placeholder="Nombre del parqueo/garaje"
                        className="easypark-input"
                    />
                </div>

                <div className="input-row">
                    <input
                        type="text"
                        placeholder="Tipo de vehículo"
                        value={nuevoVehiculo}
                        onChange={(e) => setNuevoVehiculo(e.target.value)}
                        className="easypark-input"
                    />
                    <input
                        type="text"
                        placeholder="Precio"
                        value={nuevoPrecio}
                        onChange={(e) => setNuevoPrecio(e.target.value)}
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
                    {vehiculos.map((v, i) => (
                        <tr
                            key={i}
                            onClick={() => setFilaSeleccionada(i)}
                            className={filaSeleccionada === i ? "selected-row" : ""}
                        >
                            <td>{v.tipo}</td>
                            <td>{v.precio}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}


