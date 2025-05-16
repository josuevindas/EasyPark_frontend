import React from "react";


export const About = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Acerca de EasyPark</h1>
        <p className="text-muted">Tu solución inteligente para encontrar parqueo.</p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h3>¿Qué es EasyPark?</h3>
          <p>
            EasyPark es una plataforma que conecta conductores con propietarios de parqueos disponibles. 
            Facilitamos el proceso de búsqueda, reserva de estacionamiento desde tu dispositivo móvil.
          </p>
        </div>

        <div className="col-md-6 mb-4">
          <h3>Nuestra Misión</h3>
          <p>
            Optimizar el tiempo y la experiencia de estacionamiento de los usuarios mediante tecnología eficiente, 
            segura y fácil de usar.
          </p>
        </div>

        <div className="col-md-6 mb-4">
          <h3>Beneficios para usuarios</h3>
          <ul>
            <li>Reserva en tiempo real</li>
            <li>Historial de reservas</li>
          </ul>
        </div>

        <div className="col-md-6 mb-4">
          <h3>Beneficios para propietarios</h3>
          <ul>
            <li>Administra tu parqueo fácilmente</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
