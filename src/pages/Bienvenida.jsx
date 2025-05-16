import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Bienvenida = () => {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    const storedNombre = localStorage.getItem("nombre");

    if (!storedRol) {
      navigate("/"); // redirige si no hay sesión
    } else {
      setRol(storedRol);
      setNombre(storedNombre || "Usuario");
    }
  }, [navigate]);

  return (
    <div className="container py-5 text-center">
      <h1 className="fw-bold">¡Bienvenido(a), {nombre}!</h1>
      <p className="lead">Has iniciado sesión como <strong>{rol}</strong>.</p>

      <div className="mt-4">
        {rol === "Admin" && (
          <p>Puedes gestionar usuarios y aprobar parqueos pendientes.</p>
        )}
        {rol === "propietario" && (
          <p>Puedes registrar nuevos parqueos disponibles.</p>
        )}
        {rol === "cliente" && (
          <p>Busca parqueos y realiza reservas desde esta plataforma.</p>
        )}
      </div>
    </div>
  );
};

export default Bienvenida;
